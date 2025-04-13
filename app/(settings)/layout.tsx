import { ThemeProvider } from "@/components/theme-provider"
import UserSideBar from '@/components/UserSideBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="flex w-full min-h-screen bg-gray-50 dark:bg-slate-900 ">
        {/* Sidebar */}
        <UserSideBar />
          
        {/* Main content */}
        <div className="flex-1">
          
            {children}
          
        </div>
      </main>
    </ThemeProvider>
  )
}