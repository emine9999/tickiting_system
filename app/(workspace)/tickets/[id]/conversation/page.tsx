import React from 'react'
import getUserss from '@/actions/user.actions'
import Conversation from "@/components/chats/Conversation";


const page = async () => {
  const dbUsers = await getUserss();
  const users = dbUsers.map(user => ({
    id: user.id,
    username: user.username || '',
    email: user.email || '',
    image: user.image || '',
    color: '#' + Math.floor(Math.random()*16777215).toString(16) 
  }));


  return (
   
    <Conversation/>
    
  );
}

export default page