import React from 'react'
import Image from 'next/image'

const Profile = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Profile Image Section */}
      <div className="flex justify-center items-center h-64 bg-gray-900 rounded-lg">
        <Image
          src={'/data/glx.jpg'}
          width={200}
          height={200}
          alt="Profile"
          className="rounded-full object-cover"
        />
      </div>

      {/* Profile Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Labels */}
        <div className="space-y-6">
          <p className="text-lg font-semibold text-gray-700 border-b pb-2">Email</p>
          <p className="text-lg font-semibold text-gray-700 border-b pb-2">Password</p>
          <p className="text-lg font-semibold text-gray-700 border-b pb-2">Group</p>
          <p className="text-lg font-semibold text-gray-700 border-b pb-2">Bio</p>
        </div>

        {/* Values */}
        <div className="space-y-6">
          <p className="text-lg text-gray-600 border-b pb-2">amineelhasbi@gmail.com</p>
          <p className="text-lg text-gray-600 border-b pb-2">**********</p>
          <p className="text-lg text-gray-600 border-b pb-2">SIR</p>
          <p className="text-lg text-gray-600 border-b pb-2">I'm an engineering student</p>
        </div>

        <div className="space-y-6">
<a>Edit</a>
<a>Edit</a>
<a>Edit</a>
<a>Edit</a>
        </div>
      </div>
    </div>
  )
}

export default Profile