'use client';

import Link from 'next/link';
import { signOut } from "next-auth/react";
import { LogOut, } from 'lucide-react';
import MobileNav from './MobileNav';
import UserAvatar from '../UserAvatar';

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 lg:px-10 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <Link href="/dashboard" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">T</span>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white max-sm:hidden">
          TickHub
        </p>
      </Link>

 

      <div className="flex items-center gap-3">
   
        <UserAvatar />

        
        <button 
          onClick={() => signOut()} 
          className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
        >
          <LogOut className="w-4 h-4 group-hover:text-red-500 transition-colors" />
          <span className="max-sm:hidden text-sm font-medium">Logout</span>
        </button>

        
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;