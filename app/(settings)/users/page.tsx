'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import users  from '@/data/users'
import { columns } from '@/app/(settings)/users/columns'
import { DataTableDemo } from '@/app/(settings)/users/data-table'
import { useState } from 'react'
import Profile from '@/components/Profile'
import {AddUser} from '@/components/AddUser'

export default function Users() {
  const [showProfile,setShowProfile] = useState(false)
  const toggleVisibility = () => {
    setShowProfile(!showProfile);
  };
  return (
    <div className="h-screen w-full py-3">
      {/* Header Section */}
      <div className="flex justify-between items-center mx-2 sm:mx-4 lg:mx-8 xl:mx-12 2xl:mx-16">
        <h3 className="text-2xl font-bold">Users</h3>
        <div className="hidden md:flex items-center space-x-2">
          <AddUser/>
          <Plus size={16} />
          </div>
      </div>

      {/* Data Table Section */}
      <div className="container mx-auto md:px-2 lg:p-4 ">
        <DataTableDemo columns={columns({ toggleVisibility, showProfile: showProfile })} data={users} />
        {showProfile && <Profile toggleVisibility={toggleVisibility}/>}
      </div>
    </div>
  )
}