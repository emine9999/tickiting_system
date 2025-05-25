'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <div className="p-2 rounded-lg hover:bg-slate-300 dark:hover:bg-gray-800 transition-colors duration-200 sm:hidden bg-slate-400">
            <Image
              src="/assets/icons/hamburger.svg"
              width={24}
              height={24}
              alt="hamburger icon"
              className="cursor-pointer"
            />
          </div>
        </SheetTrigger>
        
        <SheetContent 
          side="left" 
          className="border-none bg-white dark:bg-gray-900 p-0 w-[280px] sm:w-[320px]"
        >
          {/* Header Section */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white text-xl">
                TickHub
              </span>
            </Link>
          </div>

          {/* Navigation Section */}
          <div className="flex h-[calc(100vh-88px)] flex-col overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex flex-col gap-2 p-4">
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Navigation
                  </h3>
                </div>
                
                {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route || pathname.startsWith(`${item.route}/home`);

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        className={cn(
                          'flex gap-4 items-center p-4 rounded-xl transition-all duration-200 group relative overflow-hidden',
                          'hover:bg-gray-50 dark:hover:bg-gray-800/50',
                          {
                            'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-[1.02]': isActive,
                            'text-gray-700 dark:text-gray-300': !isActive,
                          }
                        )}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                        )}
                        
                        <div className={cn(
                          'p-2 rounded-lg transition-colors duration-200 ',
                          {
                            'bg-white/20': isActive,
                            'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600': !isActive,
                          }
                        )}>
                          <Image
                            src={item.imgURL}
                            alt={item.label}
                            width={20}
                            height={20}
                            className={cn(
                              'transition-all duration-200',
                              {
                                'brightness-0 invert': isActive,
                                'opacity-70 group-hover:opacity-100': !isActive,
                              }
                            )}
                          />
                        </div>
                        
                        <div className="flex flex-col">
                          <span className={cn(
                            'font-semibold text-sm transition-colors duration-200',
                            {
                              'text-white': isActive,
                              'text-gray-900 dark:text-gray-100': !isActive,
                            }
                          )}>
                            {item.label}
                          </span>
                          {isActive && (
                            <span className="text-xs text-white/80 mt-0.5">
                              Current page
                            </span>
                          )}
                        </div>
                        
                        {/* Hover effect */}
                        <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="w-2 h-2 bg-current rounded-full" />
                        </div>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>

            {/* Footer Section */}
            <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">✨</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                      Pro Features
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Upgrade for more
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;