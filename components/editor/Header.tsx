import Link from 'next/link';
import Image from 'next/image';


const Header = ({ children }: HeaderProps) => {
  return (
    <div className="header">
      <Link href="/" className="flex items-center">
        <Image
          src="/assets/icons/logo.svg"
          alt="logo with name"
          width={120}
          height={32}
          className="hidden md:block  mr-2"
        />
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