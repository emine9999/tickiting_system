'use client';   
import { useSession } from 'next-auth/react' 

interface role {
    user: {
        id: string
        email: string
        name: string
        role: string
    } | null
    role: 'admin' | 'user' | null
    isAdmin: boolean
    isUser: boolean
    isLoading: boolean
}

export default function useRole() {
  const { data: session, status } = useSession()

  const isLoading = status === 'loading'
  const user = session?.user
  const role = user?.role 

  return {
    user,
    role,
    isAdmin: role === 'admin',
    isUser: role === 'user',
    isLoading,
  }
}
