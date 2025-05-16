"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FullConversationType } from "@/types/types";
import { Conversation, Message, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { useCallback, useMemo } from "react";
import useConversation from "@/hooks/useConversation";
import useOtherUser from "@/hooks/useOtherUser";
import { useParams } from 'next/navigation'

interface ConversationListProps {
  conversations: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
}) => {
  const [items, setItems] = useState(conversations);
  const router = useRouter();
  const session = useSession();
  const { conversationId, isOpen } = useConversation();
  const params = useParams();
  const ticketId = params.id;

  return (
    <>
      {items.map((item) => {
        const otherUser = useOtherUser(item);
        const isSelected = conversationId === item.id;

        const lastMessage = useMemo(() => {
          const messages = item.messages || [];
          return messages[messages.length - 1];
        }, [item.messages]);
        
        console.log("lastMESSAGE", lastMessage);
        console.log("Items", items);
        const handleClick = useCallback(() => {
          router.push(`/tickets/${ticketId}/conversation/${item.id}`);
        }, [item.id, router]);

        const userEmail = useMemo(() => {
          return session.data?.user?.email;
        }, [session.data?.user?.email]);

        const hasSeen = useMemo(() => {
          if (!lastMessage) {
            return false;
          }
          // seen is an array of users
          const seenArray = lastMessage.seen || [];
          if (!userEmail) {
            return false;
          }

          return (
            seenArray.filter((user) => user.email === userEmail).length !== 0
          );
        }, [userEmail, lastMessage]);

        const lastMessageText = useMemo(() => {
          if (lastMessage?.image) {
            return "sent an image";
          }
          if (lastMessage?.body) {
            return lastMessage.body;
          }
          return "started a conversation";
        }, [lastMessage]);

        return (
          <div
            key={item.id}
            onClick={handleClick}
            className={`
              flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 
              transition-colors border-b border-gray-100
              ${isSelected ? "bg-gray-100" : ""}
            `}
          >
            <div className="relative w-10 h-10 flex-shrink-0 ">
              <Image
                src={otherUser?.image || "/data/glx.jpg"}
                alt={items?.name || otherUser?.username}
                fill
                className="rounded-full object-cover ring-2 ring-amber-600"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div className="flex-1 min-w-0 ">

              <div className=" flex items-center justify-between">
                <p className="font-medium text-gray-900 truncate">
                  {otherUser?.username || "User"}
                  </p>

                  <p className="text-sm text-green-600">
                    {lastMessage?.createdAt
                      ? format(new Date(lastMessage.createdAt), "p")
                      : "12:00 pm"}
                  </p>
                

              </div>
              <p className="text-sm text-slate-500">{lastMessageText}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ConversationList;
