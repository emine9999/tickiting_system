import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import Provider from "@/app/Provider"
import { ThemeProvider } from 'next-themes';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'TickHub',
  description: 'Your Team Collaboration Hub',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
 

      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen font-sans antialiased bg-blue-200",
            fontSans.variable
          )}
        >
     <Provider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
       {children}
     </ThemeProvider>
      </Provider>
            
      
        </body>
      </html>

  )
}