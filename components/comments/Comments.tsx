import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';

interface Comment {
  id: string;
  userId: string;
  content: string;
  parentId: string | null;
  createdAt: string;
}

interface CommentsProps {
  ticketId: string;  // The ID of the ticket
  userId: string;    // The ID of the logged-in user
}

const Comments = ({ ticketId, userId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  // Fetch the list of comments for the ticket
  const fetchComments = async () => {
    const response = await fetch(`/api/comments?ticketId=${ticketId}`);
    const data = await response.json();
    setComments(data);
  };

  // Trigger a fetch to update the comments list after adding a comment or reply
  const handleCommentAdded = () => {
    fetchComments();
  };

  // Handle reply click to show the CommentForm with the parentId set
  const handleReplyClick = (parentId: string) => {
    // Here we would trigger the CommentForm with the parentId set to the comment being replied to
    return <CommentForm ticketId={ticketId} userId={userId} parentId={parentId} onCommentAdded={handleCommentAdded} />;
  };

  useEffect(() => {
    fetchComments();
  }, [ticketId]);

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {/* Render the CommentForm for creating a new comment */}
      <CommentForm ticketId={ticketId} userId={userId} onCommentAdded={handleCommentAdded} />

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.content}</p>
            <button onClick={() => handleReplyClick(comment.id)}>Reply</button>

            {/* Conditionally render replies */}
            {comment.parentId === null && (
              <div className="replies">
                {comments.filter((reply) => reply.parentId === comment.id).map((reply) => (
                  <div key={reply.id} className="reply">
                    <p>{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
