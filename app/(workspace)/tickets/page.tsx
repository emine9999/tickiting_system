import React from 'react'
import data from '@/data/data'
import { columns } from '@/app/(workspace)/tickets/columns'
import { DataTableDemo } from '@/app/(workspace)/tickets/data-table'

export default async function Tickets() {
  return (
    <div className="container mx-auto  p-6">
      <DataTableDemo columns={columns} data={data} />
    </div>
  )
}
