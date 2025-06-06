'use client'
import { useMemo } from "react";
import { FullConversationType } from "@/types/types";
import { User } from "@prisma/client";
import {useSession} from "next-auth/react";


const useOtherUser = (conversation: FullConversationType | { users:User[]}) => {

    const session = useSession();

    const otherUser = useMemo(()=>{
        const currentUserEmail = session?.data?.user?.email;

        const otherUser = conversation.users.filter((user)=> user.email !== currentUserEmail);
        return otherUser
    },[session?.data?.user?.email,conversation.users])

    return otherUser[0]
}

export default useOtherUser ;