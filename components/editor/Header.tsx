import Link from 'next/link';

import { cn } from '@/lib/utils';


const Header = ({ children,className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href="/dashboard" className="flex items-center">
     
         <div className="flex flex-row justify-center items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-semibold text-slate-900 text-lg dark:text-slate-100">
              TickHub
            </span>
        </div>
       
      </Link>
      {children}
    </div>
  );
};

export default Header;