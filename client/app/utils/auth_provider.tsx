"use client"
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../lib/axiosInstance";

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: number,
  email: string,
  role: string,
  firstLogin: boolean
}

interface AuthContextDAt {
  user: User | null
  loading: boolean,
  isAdmin: boolean,
  firstLogin: boolean
}

const AuthContext = createContext<AuthContextDAt | null>(null)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const path = usePathname()
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
        console.log("🚀 ~ checkToken ~ error:", error)
      }
    }
    checkToken()

  }, [path, router])

  const isAdmin = user?.role === 'administrador' ? true : false
  const firstLogin = user?.firstLogin ? true : false
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        firstLogin,
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


