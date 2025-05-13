"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import CommentForm from "./CommentForm";
import { getComments, deleteComment } from "@/actions/comment.actions";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Comment {
  id: string;
  userId: string | null;
  content: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  ticketId: string;
  deleted: boolean;
  user: {
    username: string;
    image: string;
  };
}

interface CommentsProps {
  ticketId: string;
}

const Comments = ({ ticketId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const myref = useRef<HTMLDivElement | null>(null);
  const fetchComments = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await getComments(ticketId, userId);
      if (response) setComments(response);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [ticketId, userId]);

  const handleClick = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      // Refresh comments after deletion
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myref.current && !myref.current.contains(event.target as Node)) {
        setReplyingTo(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCommentAdded = () => {
    fetchComments();
    setReplyingTo(null);
  };

  const handleReplyClick = (parentId: string) => {
    setReplyingTo(parentId);
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const renderReplies = (parentId: string) => {
    const collectAllReplies = (id: string): Comment[] => {
      const directReplies = comments.filter((c) => c.parentId === id);
      const nestedReplies = directReplies.flatMap((reply) =>
        collectAllReplies(reply.id)
      );
      return [...directReplies, ...nestedReplies];
    };

    const replies = collectAllReplies(parentId);

    return (
      <div className="mt-2 pl-6 border-l-2 border-gray-300 space-y-3">
        {replies.map((reply) => (
          <div key={reply.id} className="flex gap-3 items-start">
            <Image
              src={reply.user.image || "/assets/data/glx.jpg"}
              alt="user image"
              width={30}
              height={30}
              className="rounded-full border border-gray-300 w-8 h-8 object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{reply.user.username}</p>
                <span className="text-gray-400 text-xs">
                  {Math.floor(
                    (Date.now() - new Date(reply.createdAt).getTime()) /
                      (1000 * 60 * 60)
                  )}
                  h ago
                </span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-none shadow-none hover:bg-white"
                      
                    >
                      ...
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-fit">
                    <DropdownMenuItem onClick={() => handleClick(reply.id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm text-slate-700">{reply.content}</p>
              <button
                className="text-blue-500 text-xs mt-1"
                onClick={() => handleReplyClick(reply.id)}
              >
                Reply
              </button>
              {replyingTo === reply.id && (
                <div className="mt-2" ref={myref}>
                  <CommentForm
                    ticketId={ticketId}
                    userId={userId}
                    parentId={reply.id}
                    onCommentAdded={handleCommentAdded}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-slate-400 p-2 rounded-xl shadow-md">
      <h3 className="text-lg font-bold mb-4">Comments</h3>

      {userId && (
        <CommentForm
          ticketId={ticketId}
          userId={userId}
          onCommentAdded={handleCommentAdded}
        />
      )}

      <div className="space-y-6 mt-4 ">
        {comments
          .filter((comment) => comment.parentId === null)
          .map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-4 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="flex gap-3 items-start ">
                <Image
                  src={comment.user.image}
                  alt="user image"
                  width={40}
                  height={40}
                  className="rounded-full border border-gray-300 w-10 h-10 object-cover"
                />
                <div className="w-full max-w-full">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{comment.user.username}</p>
                    <span className="text-gray-400 text-xs">
                      {Math.floor(
                        (Date.now() - new Date(comment.createdAt).getTime()) /
                          (1000 * 60 * 60)
                      )}
                      h ago
                    </span>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="border-none shadow-none  hover:bg-white  "
                          
                        >
                          ...
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-fit">
                        <DropdownMenuItem onClick={() => handleClick(comment.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-slate-700">{comment.content}</p>
                  <button
                    className="text-blue-500 text-xs mt-1"
                    onClick={() => handleReplyClick(comment.id)}
                  >
                    Reply
                  </button>
                  {replyingTo === comment.id && (
                    <div className="mt-2">
                      <CommentForm
                        ticketId={ticketId}
                        userId={userId}
                        parentId={comment.id}
                        onCommentAdded={handleCommentAdded}
                      />
                    </div>
                  )}
                </div>
              </div>
              {renderReplies(comment.id)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comments;
