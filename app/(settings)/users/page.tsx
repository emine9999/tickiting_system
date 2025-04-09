import React from 'react'
import { Plus } from 'lucide-react'
import users  from '@/data/users'
import { columns } from '@/app/(settings)/users/columns'
import { DataTableDemo } from '@/app/(settings)/users/data-table'

export default function Users() {
  return (
    <div className="h-screen w-full py-3">
      {/* Header Section */}
      <div className="flex justify-between items-center mx-2 sm:mx-4 lg:mx-8 xl:mx-12 2xl:mx-16">
        <h3 className="text-2xl font-bold">Users</h3>
        <button
          aria-label="Add New User"
          className="flex items-center gap-2 justify-center px-2 md:px-4 py-2.5 cursor-pointer bg-emerald-600 dark:bg-emerald-500 rounded-lg text-sm font-medium text-white hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-sm"
        >
          Add New User
          <Plus size={16} />
        </button>
      </div>

      {/* Data Table Section */}
      <div className="container mx-auto md:px-2 lg:p-4 ">
        <DataTableDemo columns={columns} data={users} />
      </div>
    </div>
  )
}