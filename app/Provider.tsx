"use client";

import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";
import Loader from "@/components/editor/Loader";
import { getUsers } from "@/actions/getUsers";
import { useSession} from "next-auth/react";
const Provider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  // resolveUsers checks if the user is in the room and fetches their data
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getUsers({ userIds });
        return users; 
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: session?.user?.email || "",
          text,
        })

        return roomUsers;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
