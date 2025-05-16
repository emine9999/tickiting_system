import {useParams} from 'next/navigation'
import {useMemo} from 'react'

const useConversation = ()=>{

    const params = useParams();
    console.log("parammmms",params)
    const conversationId = useMemo (()=>{
        if(!params?.ConvId){
            return '';

        }

        return params.ConvId as string;
    },[params?.ConvId]);

    const isOpen = useMemo(()=>!!conversationId,[conversationId])

    return useMemo(()=>({
        isOpen,
        conversationId
    }),[isOpen,conversationId])
}

export default useConversation