'use client'

import { Home, Bot, FileSearch, UserCog, Wrench, PlusCircle, Settings, Calendar, LayoutDashboard } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const mainNavItems = [
  {
    url: '/dashboard',
    icon: LayoutDashboard,
    label: 'Home',
  },

  
];

const serviceNavItems = [
  {
    url: '/users',
    icon: UserCog,
    label: 'Users',
  },
  {
    url: '/roles',
    icon: Wrench,
    label: 'Roles',
  },

];

const settingsNavItems = [
  {
    url: '/settings/profile',
    icon: Settings,
    label: 'Settings',
  },
  {
    url: '/settings/integrations',
    icon: PlusCircle,
    label: 'Integrations',
  },
];

export default function UserSideBar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  const NavItem = ({ item, count }: { item: {url: string, icon: any, label: string}, count?: number }) => {
    const isActive = pathname === item.url;
    return (
      <Link
        href={item.url}
        className={cn(
          "w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 group relative",
          isActive 
            ? "bg-blue-500 text-white" 
            : "text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"
        )}
      >
        <item.icon className="w-5 h-5" />
        {count !== undefined && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {count}
          </span>
        )}
        <span className="absolute left-14 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
          {item.label}
        </span>
      </Link>
    );
  };
  
  return (
    <div className="min-h-screen w-24 flex flex-col py-6 bg-white fixed dark:bg-slate-800 border-r border-gray-100 dark:border-slate-700 shadow-sm ">
      {/* Top traffic light dots */}
      <div className="flex justify-center space-x-1 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      
      {/* User Avatar */}
      <div className="flex justify-center mb-8">
        <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
          <AvatarImage src={session?.user?.image || "https://github.com/shadcn.png"} />
          <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      </div>
      
      {/* Main menu section */}
      <div className="px-4 ">
        <div className="flex flex-col space-y-4 items-center">
          {mainNavItems.map((item) => (
            <NavItem key={item.url} item={item} />
          ))}
        </div>
      </div>
      
      {/* Service section */}
      <div className="px-4 mb-2 ">
        <div className="flex flex-col space-y-4 items-center">
          {serviceNavItems.map((item) => (
            <NavItem key={item.url} item={item} />
          ))}
        </div>
      </div>
      
      {/* Settings section */}
      <div className="px-4  ">
        <div className="bg-gray-100 dark:bg-slate-700 rounded-xl p-3 mt-2">
          <div className="flex flex-col space-y-4 items-center">
            {settingsNavItems.map((item) => (
              <NavItem key={item.url} item={item} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Add button at bottom */}
      <div className="mt-auto flex justify-center pt-6">
        <Link
          href="/new-ticket"
          className="w-12 h-12 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200"
        >
          <PlusCircle className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}