import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import NextAuthProvider from "@/contexts/NextAuthProvider";
import { SessionProvider } from "next-auth/react"
import { StatusProvider } from '@/contexts/StatusContext';


const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Tickhub",
  description: "your Team workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen `}
      >
        <main className='w-full bg-gradient-to-b from-[#0a0a1a] to-[#272666] flex-1'>
          <SessionProvider>
            <NextAuthProvider>
              
              <StatusProvider>
                {children}
                 <Toaster />
              </StatusProvider>
              
            </NextAuthProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}