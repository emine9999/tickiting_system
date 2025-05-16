'use server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from './user.actions';

const getConversationById = async (ConversationId :string)=>{
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser?.email){
            return null
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id : ConversationId
            },
            include :{
                users :true
            }
        })

        return conversation;
    } catch (error) {
        console.log("error fetching conversationID",error)
        return []
    }
}

export default getConversationById;