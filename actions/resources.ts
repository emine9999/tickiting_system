"use server";

import { prisma } from "@/lib/prisma";
import { generateEmbeddings } from "@/lib/ai/embedding";



export const createResource = async (content: any) => {
  try {
    

    // Create the resource
    const resource = await prisma.resource.create({
      data: {
        content
      }
    });

    // Generate and store embeddings
    const embeddings = await generateEmbeddings(content);
    await prisma.embedding.createMany({
      data: embeddings.map((embedding) => ({
        resourceId: resource.id,
        content: embedding.content,
        embedding: embedding.embedding,
      })),
    });

    return "Resource successfully created and embedded.";
  } catch (error) {
    return error instanceof Error && error.message.length > 0
      ? error.message
      : "Error, please try again.";
  }
};