"use client";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo } from "react";
import Image from "next/image";
import AvatarGroup from './AvatarGroup'
import UserProfile from "./UserProfile";
interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}
const Header = ({ conversation }: HeaderProps) => {
  const otherUser = useOtherUser(conversation);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "active";
  }, [conversation]);

  return (
    <div className="flex gap-3 w-full p-2 bg-slate-200 shadow-xl flex-row">
      <div className="flex-1 flex gap-3 w-full  flex-row">
      {conversation.isGroup ? <AvatarGroup users={conversation.users}/> : (
              <div className="relative w-10 h-10 flex-shrink-0 ">
                <Image
                  src={otherUser?.image || "/data/u.png"}
                  alt={otherUser?.username || "user"}
                  fill
                  className="rounded-full object-cover ring-2 ring-amber-600"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
            )}

        <div>
          {conversation.name || otherUser.username}
          <div className="text-sm font-semibold text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <UserProfile 
      data={conversation}
      />
    </div>
  );
};

export default Header;
