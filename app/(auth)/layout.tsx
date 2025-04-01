import type { Metadata } from "next";
import { Gabarito } from 'next/font/google';
import "../globals.css";
import Image from 'next/image';

// Define the font family
const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gabarito",
  style: ["normal"],
});



export const metadata: Metadata = {
  title: "TICK-hub - Authentication",
  description: "Your New Ticketing System",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gabarito.variable}  font-sans antialiased`}
      >
        <div
          className="h-screen bg-[#272666]  text-white relative overflow-hidden flex items-center justify-center"
        >
          <div className="absolute inset-0 w-full h-full ">
            <Image 
              src="/data/bg-pattern.svg" 
              alt="Auth Background" 
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className=" relative   z-10 p-15 flex flex-col items-center justify-center  w-full max-w-lg">
            
            <div
              className="flex flex-col items-center gap-8 bg-white rounded-2xl shadow-2xl p-8  w-full text-black"
            >
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}