import { ReactNode } from 'react';
import StreamVideoProvider from '@/contexts/StreamClientProvider';
import { ThemeProvider } from 'next-themes';
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main className='dark:bg-gray-900 bg-white'>
      <StreamVideoProvider>
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
       {children}
     </ThemeProvider>
      </StreamVideoProvider>
    </main>
  );
};

export default RootLayout;