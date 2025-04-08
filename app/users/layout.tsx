
import { ThemeProvider } from "@/components/theme-provider"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
     <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >

      <main className='w-full h-screen overflow-x-hidden'>
      
        {children}
                  
        
      </main>
   </ThemeProvider>
  )
}
