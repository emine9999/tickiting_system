import { embed, embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { prisma } from "@/lib/prisma";
const embeddingModel = openai.embedding("text-embedding-ada-002");

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

export const generateEmbeddings = async (value: string): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value);
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\n", " ");
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  const userQueryEmbedded = await generateEmbedding(userQuery);

  // MongoDB aggregation pipeline for vector similarity search
  const similarGuides = await prisma.embedding.aggregateRaw({
    pipeline: [
      {
        $addFields: {
          similarity: {
            $multiply: [
              {
                $divide: [
                  { $reduce: {
                    input: { $zip: { inputs: ["$embedding", userQueryEmbedded] } },
                    initialValue: 0,
                    in: { $add: ["$$value", { $multiply: [{ $arrayElemAt: ["$$this", 0] }, { $arrayElemAt: ["$$this", 1] }] }] }
                  } },
                  {
                    $sqrt: {
                      $multiply: [
                        { $reduce: {
                          input: "$embedding",
                          initialValue: 0,
                          in: { $add: ["$$value", { $multiply: ["$$this", "$$this"] }] }
                        } },
                        { $reduce: {
                          input: userQueryEmbedded,
                          initialValue: 0,
                          in: { $add: ["$$value", { $multiply: ["$$this", "$$this"] }] }
                        } }
                      ]
                    }
                  }
                ]
              },
              1
            ]
          }
        }
      },
      { $match: { similarity: { $gt: 0.3 } } },
      { $sort: { similarity: -1 } },
      { $limit: 4 },
      { $project: { content: 1, similarity: 1, _id: 0 } }
    ]
  });

  return similarGuides;
};