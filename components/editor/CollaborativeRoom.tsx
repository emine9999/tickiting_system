"use client";
import {Editor} from '@/components/editor/Editor'
import Header from '@/components/editor/Header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession,signOut } from "next-auth/react";
import {
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

const CollaborativeRoom = () => {
    const { data: session } = useSession();
  return (
    <RoomProvider id="my-room">
    <ClientSideSuspense fallback={<div>Loading…</div>}>
 <div className="collaborative-room">
 <Header>
            <div className='flex w-fit items-center justify-center gap-2'>
            <p className='text-white'>kjdk</p>
            </div>
            <Avatar className="lg:w-14 lg:h-14 rounded-full">
          <AvatarImage src={session?.user?.image || "https://github.com/shadcn.png"} />
          <AvatarFallback>{session?.user?.name?.charAt(0) || "CN"}</AvatarFallback>
        </Avatar>
        </Header>
        <Editor/>
 </div>
    </ClientSideSuspense>
  </RoomProvider>
  )
}

export default CollaborativeRoom