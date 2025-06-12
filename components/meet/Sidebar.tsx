'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, 
  ChevronRight, 
  
} from 'lucide-react';
import ModeToggle  from '@/components/ModeToggle';

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);


  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };



  return (
    <section 
      className={cn(
        "sticky left-0 top-0 flex h-screen flex-col justify-between transition-all duration-300 ease-in-out max-sm:hidden",
        "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      
      <div className="p-4 pt-20">
        <div className="flex items-center justify-between mb-8">
          <div className={cn(
            "flex items-center gap-3 transition-opacity duration-200",
            isCollapsed ? "opacity-0" : "opacity-100"
          )}>
            {/* <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white text-lg">
              TickHub
            </span> */}
          </div>
          
          <button
            onClick={toggleSidebar}
            className="p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-900 dark:text-gray-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-900 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/meetings`);
            
            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn(
                  'flex items-center gap-3 p-3  rounded-xl transition-all duration-200 group relative',
                  'hover:bg-gray-50 dark:hover:bg-gray-800',
                  {
                    'bg-purple-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300': isActive,
                    'text-gray-700 dark:text-gray-300': !isActive,
                  },
                  isCollapsed ? 'justify-center px-5 gap-0' : 'justify-start'
                )}
              >
                <div className={cn(
                  "flex-shrink-0 transition-transform duration-200 ",
                  isActive && !isCollapsed ? "scale-110" : ""
                )}>
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={20}
                    height={20}
                    className={cn(
                      "transition-all duration-200   ",
                      isActive ? "opacity-100" : "opacity-70"
                    )}
                  />
                </div>
                
                <span className={cn(
                  "font-medium transition-all duration-200",
                  isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                )}>
                  {item.label}
                </span>

                
                {isActive && (
                  <div className="absolute right-2 w-2 h-2 bg-blue-600 rounded-full" />
                )}

                
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-100">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        
        <div className={cn(
          "flex items-center",
          isCollapsed ? "justify-center" : "justify-end"
        )}>
         
         <ModeToggle />
        </div>
      </div>
    </section>
  );
};

export default Sidebar;