"use client";
import { User } from "@/types/types";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useParams } from 'next/navigation'
const UserList = ({ users }: { users: User[] }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const ticketId = params.id;
  const handleClick = useCallback(async (userId: string) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post("/api/conversations", {
        userId: userId,
      });
      router.push(`/tickets/${ticketId}/conversation/${response.data.id}`);
    } catch (error) {
      console.error("Error creating conversation:", error);
    } finally {
      setIsLoading(false);
    }
  }, [router, isLoading]);

  return (
    <>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
          onClick={() => handleClick(user.id.toString())}
        >
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/data/glx.jpg"
              alt={user.username}
              fill
              className="rounded-full object-cover ring-2 ring-amber-600"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">{user.username}</p>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserList;