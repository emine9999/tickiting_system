import { getCurrentUser } from "@/actions/user.actions";
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { pusherServer } from "@/lib/pusher";
import ConversationId from "@/app/(workspace)/tickets/[id]/conversation/[ConvId]/page";
export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { conversationId, message, image } = body;
        
        if (!conversationId || !message || !currentUser?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id,
                    },
                },
                seen: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
            include: {
                sender: true,
                seen: true,
            }
        });

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id,
                    },
                },
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        })
        await pusherServer.trigger(conversationId,'messages.new',newMessage)
        const lastMessage = updatedConversation.messages[updatedConversation.messages.length-1]
        updatedConversation.users.map((user)=>{
            pusherServer.trigger(user.email! ,'conversation:update',{
                id: ConversationId,
                messages :[lastMessage]
            })
        })
        return NextResponse.json({ newMessage}, { status: 200 });
    }catch(error) {
        console.log("ERROR creating or updating the message", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
