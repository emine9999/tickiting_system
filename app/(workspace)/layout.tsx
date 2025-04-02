import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/App-sidebar"
import { ThemeProvider } from "@/components/theme-provider"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
     <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full h-screen'>
        <SidebarTrigger />
        {children}
                  
        
      </main>
    </SidebarProvider></ThemeProvider>
  )
}
