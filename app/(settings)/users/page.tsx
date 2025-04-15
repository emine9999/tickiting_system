'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import users  from '@/data/users'
import { columns } from '@/app/(settings)/users/columns'
import { DataTableDemo } from '@/app/(settings)/users/data-table'
import {AddUser} from '@/components/AddUser'

export default function Users() {
 
  return (
    <div className="h-screen w-full py-3 pl-24">
      {/* Header Section */}
      <div className="flex justify-between items-center mx-2  ">
        <h3 className="text-2xl font-bold">Users</h3>
        <div className="hidden md:flex items-center space-x-2">
          <AddUser/>
          <Plus size={16} />
        </div>
      </div>

      {/* Data Table Section */}
      <div className="container mx-auto ">
        <DataTableDemo columns={columns()} data={users} />
        
      </div>
    </div>
  )
}