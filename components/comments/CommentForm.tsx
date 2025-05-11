import React, { useState } from 'react';

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
      // Create the comment payload
      const commentData = {
        ticketId,
        userId,
        content: commentContent,
        parentId: parentId || null, // Set parentId if it's a reply, otherwise set to null
      };

      // Call the backend server action or API to save the comment
      await createComment(commentData);

      // Clear the comment input field after submission
      setCommentContent('');
      onCommentAdded(); // Refresh or trigger an update for the comments list
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // This function will handle the API call to create a comment
  const createComment = async (data: { ticketId: string; userId: string; content: string; parentId: string | null }) => {
    // Example: Make a POST request to your backend server or server actions
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="Write a comment..."
        rows={4}
        className="comment-input"
        disabled={isSubmitting}
      />
      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : parentId ? "Reply" : "Add Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
