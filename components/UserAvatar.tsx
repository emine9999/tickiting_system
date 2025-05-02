'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession} from "next-auth/react";

const UserAvatar = () => {
    const { data: session } = useSession();
  return (
    <Avatar className="lg:w-12 lg:h-12 rounded-full">
    <AvatarImage src={session?.user?.image || "https://github.com/shadcn.png"} />
    <AvatarFallback>{session?.user?.name?.charAt(0) || "CN"}</AvatarFallback>
  </Avatar>
  )
}

export default UserAvatar