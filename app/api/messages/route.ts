import { getCurrentUser } from "@/actions/user.actions";
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

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
        return NextResponse.json({ newMessage}, { status: 200 });
    }catch(error) {
        console.log("ERROR creating or updating the message", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
