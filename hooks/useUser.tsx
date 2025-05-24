'use client';
import { useSession} from "next-auth/react";


export default function useUser() {

  const { data: session ,status} = useSession();
  const isLoaded = status === 'loading'
  const user = session?.user || null;

    return {user,isLoaded};

  }