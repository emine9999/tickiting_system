"use client";
import React from 'react'
import { MessageCircleMore, ReceiptText, History, ArrowLeft, Pin } from 'lucide-react';
import { usePathname } from "next/navigation";
import Link from "next/link";
import AddNewTicket from './AddNewTicket';
import {Ticket} from '@/types/types'

interface Props {
    tickets: Ticket[];
  } 

const ChatHeader = ({tickets}:Props) => {
    const pathname = usePathname();
   
    const ticketId = pathname.split('/')[2]; 

    const items = [
        {
            id: "2",
            title: "ticket Details",
            icon: <ReceiptText size={20}/>,
            url: `/tickets/${ticketId}/details`,
        },
        {
            id: "1",
            title: "conversation",
            icon: <MessageCircleMore size={21} />,
            url: `/tickets/${ticketId}/conversation`,
        },
        {
            id: "3",
            title: "ticket History",
            icon: <History size={20}/>,
            url: `/tickets/${ticketId}/history`,
        },
    ];

    return (
        <div>
            {pathname === "/tickets" && (
                <div className="flex justify-between items-center mx-2 sm:mx-4 lg:mx-8 xl:mx-12 2xl:mx-16">
                    <h3 className="text-xl font-bold">Tickets</h3>
                    <AddNewTicket />
                </div>
            )}
            
            {pathname.startsWith("/tickets/") && (
                <div>
                    <div className="flex justify-between items-center mx-2 sm:mx-4 lg:mx-8 xl:mx-12 2xl:mx-16">
                        <Link href="/tickets">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <ArrowLeft size={22} />
                                <h3 className="text-xl font-bold">Ticket List</h3>
                            </div>
                        </Link>
                        <div className="flex items-center gap-2">
                            <p className="text-xl font-bold">TC-293</p>
                            <h3 className="bg-slate-200 px-2 rounded-full dark:bg-slate-600">
                                {tickets.find(ticket => ticket.id === ticketId)?.title.slice(0,20) || "Ticket Title"}
                            </h3>
                            <Pin size={20} />
                        </div>
                        <AddNewTicket />
                    </div>
                    <div className='flex items-center justify-center gap-4 py-3 mt-5 bg-slate-100 shadow-lg'>
                        {items.map((item) => (
                            <div key={item.id}>
                                <div className='flex gap-2'>
                                    <span className='text-xl text-gray-600'>{item.icon}</span>
                                    <Link 
                                        href={item.url}
                                        className={`text-sm ${
                                            pathname.endsWith(item.url.split('/').pop() || '') 
                                            ? 'bg-green-300 text-gray-600 rounded-full px-3 underline' 
                                            : 'text-gray-600'
                                        }`}
                                    >
                                        {item.title}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {!pathname.startsWith("/tickets") && <div>Default Header</div>}
        </div>
    );
}

export default ChatHeader;