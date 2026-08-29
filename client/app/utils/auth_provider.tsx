"use client"
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../lib/axiosInstance";

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: number,
  email: string,
  perfil: string
}

interface AuthContextDAt {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextDAt | null>(null)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const [loading, setLoaging] = useState(false)

  useEffect(() => {
    async function checkToken() {
      try {
        const response = await api.get('/me')
        if (response.status === 200) {
          setUser(response.data)
        }
      } catch (error) {
        router.push('/login')
      }
    }
    checkToken()
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export function useAuth() {
  const context = useContext(AuthContext)

  return context
}


