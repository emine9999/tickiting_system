"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/App-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { useState } from 'react';
import Notification from '@/components/Notification'

export default function Layout({ children  }: { children: React.ReactNode }) {
  const [isToggle,setToggle] = useState(false)
  const handleclick =()=>{
    setToggle(!isToggle)
  }
  return (
     <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
    <SidebarProvider>
      <AppSidebar onButtonClick={handleclick}/>
      <main className='w-full h-screen overflow-x-hidden bg-white dark:bg-slate-900'>
        <SidebarTrigger />
        {isToggle && <Notification/>}
        {children}
                  
        
      </main>
    </SidebarProvider></ThemeProvider>
  )
}
