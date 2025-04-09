import React from 'react'
import Profile from '@/components/Profile'
const page = () => {
  return (
    <div className='min-h-screen p-3  dark:bg-slate-600 flex bg-white'>
      <div className='min-h-[86vh]'><h1 className='text-2xl font-bold p-3 '>Account Settings</h1>
      </div>
      <div className='container mx-auto rounded-2xl bg-slate-300 min-h-[86vh]'>
        <Profile/>
      </div>
    </div>
  )
}

export default page