import React, { useState } from 'react';
import {createComment} from '@/actions/comment.actions'

interface CommentFormProps {
  ticketId: string;  // The ID of the ticket to which the comment belongs
  userId: string;    // The ID of the user adding the comment
  parentId?: string; // Optional parentId for replying to an existing comment
  onCommentAdded: () => void; // A function to refresh or update the comments after adding a comment
}

const CommentForm = ({ ticketId, userId, parentId, onCommentAdded }: CommentFormProps) => {
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle the form submission (for both creating and replying to a comment)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return; // Don't submit if the content is empty

    setIsSubmitting(true);

    // Send the comment to the backend
    try {
      
      await createComment(ticketId, userId, commentContent, parentId || undefined);

      // Clear the comment input field after submission
      setCommentContent('');
      onCommentAdded(); // Refresh or trigger an update for the comments list
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-3 flex flex-col mb-4">
      <textarea
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="Write a comment..."
        rows={2}
        className="w-full border rounded-md p-2 bg-white"
        disabled={isSubmitting}
      />
      <button type="submit" className="bg-blue-500 rounded-lg px-2 py-1 text-white text-sm hover:bg-blue-400 cursor-pointer" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : parentId ? "Reply" : "Add Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
