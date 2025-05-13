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


export async function getComments(ticketId:string,userId:string){
  try{

    const comments =  await prisma.comment.findMany({
      where: {
        ticketId,
        
      },
      include: {
        user: true
      }
    })
    
    return comments
  }catch(error){
      console.log("error while fetching comments :", error)
  }
}


export async function deleteComment(commentId: string) {
  try {
    // First recursively delete all replies
    const deleteReplies = async (parentId: string) => {
      const replies = await prisma.comment.findMany({
        where: { parentId }
      });
      
      for (const reply of replies) {
        await deleteReplies(reply.id);
        await prisma.comment.delete({
          where: { id: reply.id }
        });
      }
    };

    // Delete all replies first
    await deleteReplies(commentId);

    // Then delete the parent comment
    await prisma.comment.delete({
      where: { id: commentId }
    });

    return { success: true };
  } catch (error) {
    console.error("Error while deleting comment:", error);
    throw new Error("Failed to delete comment");
  }
}