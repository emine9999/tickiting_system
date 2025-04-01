import React from 'react'
import {auth} from '@/auth'
import { logoutAction } from '@/actions/AuthAction'
const page = async() => {
  const session = await auth()
  return (
    <div>
  {session?.user && 
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.email}</p> 
      <form action ={logoutAction}>
      <button className="bg-red-300 p-5 cursor-pointer hover:bg-amber-300 focus-visible:bg-amber-300">
  Logout
</button>
      </form>
    </div>
  }
  </div>
  ) 
  
}

export default page