import { getCurrentUser } from "@/actions/user.actions";
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'
import { pusherServer } from "@/lib/pusher";

interface IParams {
    ConvoId: string;  
}

export async function DELETE(request: Request, props: { params: Promise<IParams> }) {
    const params = await props.params;
    try {
        const currentUser = await getCurrentUser();
        
        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        
        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: params.ConvoId
            },
            include: {
                users: true
            }
        });

        if (!existingConversation) {
            return new NextResponse("Conversation not found", { status: 404 });
        }

        
        const deletedConversation = await prisma.conversation.delete({
            where: {
                id: params.ConvoId,
                userIds : {
                    hasSome: [currentUser.id]
                }
            }
        });

        existingConversation.users.forEach((user)=>{
            if (user.email){
                pusherServer.trigger(user.email,'conversation:remove',existingConversation)
            }
        })

        return NextResponse.json(deletedConversation);
    } catch (error: any) {
        console.log("[CONVERSATION_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}