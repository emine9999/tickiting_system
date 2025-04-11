import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Profile from '@/components/Profile'
const page = () => {
  const profileDetails = [
    { label: 'Email', value: 'amineelhasbi@gmail.com' },
    { label: 'Password', value: '**********' },
    { label: 'Group', value: 'SIR' },
    { label: 'Bio', value: "I'm an engineering student" },
  ];
  return (
    <div className='min-h-screen px-3  dark:bg-slate-600 flex bg-gradient-to-r from-green-100 to-zinc-400 gap-3'>
      <div className='h-screen py-5 w-auto'>
        <h1 className='text-2xl font-bold p-3 '>Account Settings</h1>
        <div className='p-3 bg-white shadow-xl w-[330px] backdrop-blur-sm  rounded-2xl border'>
              <div >
                  <div className='flex justify-start items-center pb-2'>
                  <Avatar className="w-20 h-20 rounded-full border-4 border-white">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User Avatar"
                />
              </Avatar>
              <h1 className=' text-xl font-semibold text-start px-3'>Amine Elhasbi</h1>

                  </div>
                {profileDetails.map((data) => (
                  <div key={data.label} className='flex justify-start gap-3   py-3 px-3'>
                    <p className='text-sm font-semibold text-gray-700 '>{data.label} :</p>
                    <p className='text-sm text-gray-600 break-words'>{data.value}</p>
                  </div>
                ))}
            </div>
          </div>
      </div>
      <div className='container mx-auto rounded-2xl h-screen '>
        <Profile/>
      </div>
    </div>
  )
}

export default page