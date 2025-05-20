import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';


const Header = ({ children,className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href="/dashboard" className="flex items-center">
        {/* <Image
          src="/assets/icons/logo.svg"
          alt="logo with name"
          width={120}
          height={32}
          className="hidden md:block  mr-2"
        /> */}
         <div className="flex flex-row justify-center items-center">
          <h1 className="font-bold text-2xl ">TICK</h1> <span>hub</span>
        </div>
        <Image
          src="/assets/icons/logo-icon.svg"
          alt="logo with name"
          width={32}
          height={32}
          className="md:hidden"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;