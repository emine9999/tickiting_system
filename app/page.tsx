import React from 'react';
import { LuTickets } from "react-icons/lu";
import Link from 'next/link';

const Page = () => {
  return (
    <div className="container px-4 sm:px-8 lg:px-16 h-screen  relative bg-[#272666]  z-10 ">

      <div className=" p-5 flex justify-between items-center">
        <div className=" w-48 flex justify-evenly items-center text-white">
          <LuTickets size={32} />
          <p className="text-2xl font-bold text-white underline">TICKhub</p>
        </div>

        <div className="flex gap-4">
          <Link href="/auth">
            <button className="px-4 py-2 bg-blue-600 rounded-lg cursor-pointer text-white hover:bg-[#4861DD] transition-colors">
              Login
            </button>
          </Link>
          <Link href="/auth">
            <button className="px-4 py-2 bg-blue-600 cursor-pointer rounded-lg text-white hover:bg-[#4861DD] transition-colors">
              Register
            </button>
          </Link>
        </div>
      </div>

      <div className='space-y-5 min-h-1/2 p-32 text-center text-white'>
        <h1 className='text-4xl font-bold'> IL NOUS FONT CONFIANCE POUR GERE LEURS INCIDENTS</h1>
        <p className='text-xl text-gray-300'>Avec TICKhub,nous avons reduit le temps de resolution de 40% et ameliore la satisfaction de vos clients</p>
      </div>
    </div>
    
  );
};

export default Page;