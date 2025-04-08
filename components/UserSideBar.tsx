'use client'

import { Home, Bot, TicketCheck, FileSearch } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from "next-auth/react";
import Link from 'next/link';

const navItems = [
  {
    url: '/dashboard',
    icon: Home,
  },
  {
    url: '/analysis',
    icon: Bot,
  },
  {
    url: '/tickets',
    icon: TicketCheck,
  },
  {
    url: '/documentation',
    icon: FileSearch,
  },
];

export default function UserSideBar() {
  const { data: session } = useSession();
  
  return (
    <div className="h-screen w-20 flex flex-col py-6 bg-white border-r border-gray-100">
      {/* Logo section */}
      <div className="px-4 mb-10 flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl text-indigo-600">TICK</h1>
        <span className="font-bold text-xl text-indigo-600 text-center">hub</span>
      </div>

      {/* Navigation section */}
      <div className="flex-1 flex flex-col items-center space-y-8">
        {navItems.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className="text-gray-500 hover:text-gray-800"
          >
            <item.icon className="w-6 h-6" />
          </Link>
        ))}
      </div>

      {/* User profile section */}
      <div className="flex justify-center mt-auto">
        <Avatar className="w-12 h-12">
          <AvatarImage src={session?.user?.image || "https://github.com/shadcn.png"} />
          <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}