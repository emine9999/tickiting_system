import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/user.actions";
import { prisma } from '@/lib/prisma'

interface Iparams {
    ConvoId?: string;
    id: string;
    }


export async function POST(
    request: Request,
    { params }: { params: Iparams }
) {
    try {
        const currentUser = await getCurrentUser();
        const { ConvoId } = params;
        if (!currentUser?.id || !currentUser?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: ConvoId,
            },
            include: {
                messages: {
                    include : {
                        seen: true,
                    },
                }
            },
        });

        if (!conversation) {
            return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
        }
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        if (!lastMessage) {
            return NextResponse.json(conversation, { status: 200 });
        }

        const updateMessage = await prisma.message.update({
            where : {
                id: lastMessage.id,
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },

        });
        return NextResponse.json(updateMessage, { status: 200 });
    } catch (error) {
        console.log("Error in POST /api/conversations/[ConvoId]/seen/route.ts", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        
    }
    
}