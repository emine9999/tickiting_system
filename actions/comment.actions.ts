// app/actions/comments.ts
"use server";

import { prisma } from "@/lib/prisma"; // Import your Prisma client

export async function createComment(ticketId: string, userId: string, content: string, parentId?: string) {
  try {
    // Validate input
    if (!ticketId || !userId || !content.trim()) {
      throw new Error("Ticket ID, User ID, and content are required.");
    }

    // Create the new comment in the database
    const newComment = await prisma.comment.create({
      data: {
        content,
        ticketId,
        userId,
        parentId, // Add parentId if it's a reply
      },
    });

    return newComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Failed to create comment.");
  }
}
