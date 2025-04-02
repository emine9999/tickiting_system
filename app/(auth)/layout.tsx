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
        className={`${gabarito.variable} font-sans antialiased`}
      >
        <div
          className="min-h-screen h-full bg-[#272666] text-white relative overflow-hidden flex items-center justify-center py-6 sm:py-10"
        >
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/data/bg-pattern.svg"
              alt="Auth Background"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xs sm:max-w-md md:max-w-lg px-4 sm:px-6">
            <div
              className="flex flex-col items-center  bg-white  rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4   w-96 text-black"
            >
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}