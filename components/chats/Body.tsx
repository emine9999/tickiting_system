'use client'
import useConversation from "@/hooks/useConversation"
import { BodyProps } from "@/types/types"
import { useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox"
import axios from "axios"

const Body: React.FC<BodyProps> = ({ initialMessages }) => {  
    const [messages, setMessages] = useState(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)
    const { conversationId } = useConversation()
    console.log("messageees",messages)

    useEffect(()=>{
        axios.post(`/api/conversations/${conversationId}/seen`)
    },[conversationId])
    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageBox
                    key={message.id}  
                    isLast={i === messages.length - 1}
                    data={message}
                />
            ))}
            <div ref={bottomRef} className="pt-24" />
        </div>
    )
}

export default Body