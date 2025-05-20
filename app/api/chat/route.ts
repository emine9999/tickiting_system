import { createResource } from "@/actions/resources";
import { findRelevantContent } from "@/lib/ai/embedding";
import { groq } from "@ai-sdk/groq";
import { generateObject, streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {

  try{
  // recupere les msgs envoye par lutilisateur
  const { messages } = await req.json();
 if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages format', { status: 400 });
    }
  // utilise GPT-4o pour repondre a lutilisateur avec des regles strictes definies dans le bloc system
  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    messages,
    system: `You are a helpful assistant acting as the users' second brain.
    Use tools on every request.
    Be sure to getInformation from your knowledge base before answering any questions.
    If the user presents infromation about themselves, use the addResource tool to store it.
    If a response requires multiple tools, call one tool after another without responding to the user.
    If a response requires information from an additional tool to generate a response, call the appropriate tools in order before responding to the user.
    ONLY respond to questions using information from tool calls.
    if no relevant information is found in the tool calls, respond, "Sorry, I don't know."
    Be sure to adhere to any instructions in tool calls ie. if they say to responsd like "...", do exactly that.
    If the relevant information is not a direct match to the users prompt, you can be creative in deducing the answer.
    Keep responses short and concise. Answer in a single sentence where possible.
    If you are unsure, use the getInformation tool and you can use common sense to reason based on the information you do have.
    Use your abilities as a reasoning machine to answer questions based on the information you do have.
`,
    tools: {

      // this tool is used to add a resource to the knowledge base
      // it is used when the user provides a random piece of knowledge unprompted
      // it is used to store information about the user
      addResource: tool({
        description: `add a resource to your knowledge base.
          If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
        parameters: z.object({
          content: z
            .string()
            .describe("the content or resource to add to the knowledge base"),
        }),
        execute: async ({ content }) => createResource({ content }),
      }),

      // this tool is used to get information from the knowledge base
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`, // petit description qui explique ce que fait l'outil
        parameters: z.object({  // il attent la question de l'utilisateur et les mots cles pour la recherche
          question: z.string().describe("the users question"),
          similarQuestions: z.array(z.string()).describe("keywords to search"),
        }),
        execute: async ({ similarQuestions }) => {
          const results = await Promise.all(
            similarQuestions.map(
              async (question) => await findRelevantContent(question),
            ),
          );
          // Flatten the array of arrays and remove duplicates based on 'name'
          const uniqueResults = Array.from(
            new Map(results.flat().map((item) => [item?.name, item])).values(),
          );
          return uniqueResults;
        },
      }),

      // elle envoie la qst a un model de l'IA elle demande au model de genere 3 qst similaires elle retourne ces qst pour aider a chercher dans la memoire
      understandQuery: tool({
        description: `understand the users query. use this tool on every prompt.`,
        parameters: z.object({
          query: z.string().describe("the users query"),
          toolsToCallInOrder: z
            .array(z.string())
            .describe(
              "these are the tools you need to call in the order necessary to respond to the users query",
            ),
        }),
        execute: async ({ query }) => {
          const { object } = await generateObject({
            model: groq('llama-3.1-8b-instant'),
            system:
              "You are a query understanding assistant. Analyze the user query and generate similar questions.",
            schema: z.object({
              questions: z
                .array(z.string())
                .max(3)
                .describe("similar questions to the user's query. be concise."),
            }),
            prompt: `Analyze this query: "${query}". Provide the following:
                    3 similar questions that could help answer the user's query`,
          });
          return object.questions;
        },
      }),
    },
  });
  
// a la fin il envoie progressivement la reponse a lutilisateur
  return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ 
      error: 'An error occurred during processing',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
