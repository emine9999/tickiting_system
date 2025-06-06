'use server'
import { prisma } from '@/lib/prisma'

import { getCurrentUser } from './user.actions';

const getConversations = async()=>{

    const currentUser = await getCurrentUser();
    if (!currentUser?.id){
        return [];
    }

    try {

        const conversations = await prisma.conversation.findMany({
            orderBy :{
                lastMessageAt : 'desc'
            },

            where :{
                userIds : {
                    has : currentUser.id
                }
            },
            include :{
                users : true,
                messages :{
                    include :{
                        sender: true,
                        seen : true,
                    }
                }
            }
        });
        return conversations;
        
    } catch (error) {
        console.log("error fetching conversations :",error)
        return []
    }
}
export default getConversations;