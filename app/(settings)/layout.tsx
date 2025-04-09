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
      <main className="flex w-full h-screen overflow-x-hidden">
        {/* Sidebar */}
        <UserSideBar />
      
        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </ThemeProvider>
  )
}