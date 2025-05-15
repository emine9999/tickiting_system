import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/actions/user.actions'

// this to create a conversation 1 to 1, or a group chat
export async function POST (request:Request){
    
    try {
        const currentUser =  await getCurrentUser();
        const body = await request.json();
        const {
            userId,
            isGroup,
            members,
            name
        } = body;

        if (!currentUser?.id || !currentUser?.email){
            return new NextResponse("Unauthorized", {status:401})
        }

        if (isGroup && (!members || members.length < 2 || !name)){
            return new NextResponse("Invalid data" ,{status: 400})
        }

        if (isGroup){
            const newConveration = await prisma.conversation.create({
                data : {
                    name,
                    isGroup,
                    users : {
                        connect: [
                            ...members.map((member: {value: string}) => ({
                                    id : member.value
                            })),
                            {
                                id : currentUser.id // this used to add ourselfs if we are the one who created the group chat
                            }
                        ]
                    }
                },

                include : {
                    users : true
                }
            })

            return NextResponse.json(newConveration)
        }

        const existingConversations = await prisma.conversation.findMany({
            where : {
                OR : [
                    {
                        userIds :{
                            equals : [currentUser.id ,userId]
                        },
                        
                    },
                    {
                        userIds :{
                            equals :[userId ,currentUser.id]
                        }
                    }
                    // TODO : link the conv to the ticket
                ]
            }
        });

        const singleConversation = existingConversations[0];
        if (singleConversation){
            return NextResponse.json(singleConversation)
        }

        const newConveration = await prisma.conversation.create({
            data : {
                users : {
                    connect : [
                        {
                            id:currentUser.id
                        },
                        {
                            id : userId
                        }
                    ]
                }
            },
            include :{
                users : true
            }
        })
         return NextResponse.json(newConveration)

    } catch (error) {
        console.log("eroor creating the conver", error)
        return new NextResponse("Internal Error", {status:500})
    }
}