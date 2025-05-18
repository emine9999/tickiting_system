"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import getUserss  from "@/actions/user.actions";
import ConversationList from '@/components/chats/ConversationList';
import UserList from '@/components/chats/UserList';
import getConversations from "@/actions/getConversations";
import CreateGroup  from "@/components/chats/CreateGroup";


export default function ChatLayout({ children  }: { children: React.ReactNode }){
  const [users, setUsers] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [select, setSelect] = useState<string>('users');
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUserss(); 
      setUsers(fetchedUsers);
    };
    
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      const fetchedConversations = await getConversations(); 
      setConversations(fetchedConversations);
    };
    
    fetchConversations();
  }, []);
  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10 flex items-center gap-3">
          <Select value={select} onValueChange={setSelect}>
            <SelectTrigger className="w-full border-dotted outline-none shadow-none">
              <SelectValue placeholder="Users" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="conversations">Conversations</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <CreateGroup users={users}/>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          
          {select === "users" ? <UserList users={users} /> : <ConversationList conversations={conversations} users={users} /> }
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
      
        <div className="flex-1 overflow-y-auto ">
        {children}
        </div>
      </div>
    </div>
  );
};

