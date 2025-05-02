"use client";

import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";
import Loader from "@/components/editor/Loader";
import { getUsers } from "@/actions/getUsers";

const Provider = ({ children }: { children: ReactNode }) => {
  // resolveUsers checks if the user is in the room and fetches their data
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getUsers({ userIds });
        return users; 
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
