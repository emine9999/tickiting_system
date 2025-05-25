import { Metadata } from 'next';
import { ReactNode } from 'react';
import { Toaster } from "@/components/ui/sonner"
import Navbar from '@/components/meet/Navbar';
import Sidebar from '@/components/meet/Sidebar';
import { ThemeProvider } from 'next-themes';
export const metadata: Metadata = {
  title: 'TickHub - Team Workspace',
  description: 'A workspace for your team',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className="relative">
      <Navbar />

      <div className="flex">
        <Sidebar />
        
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
          </div>
                  <Toaster />

        </section>
      </div>
    </main>
  );
};

export default RootLayout;