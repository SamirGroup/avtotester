import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../services/api'

interface User {
  id: number
  username: string
  full_name: string
  role: string
  is_expired: boolean
  days_remaining: number
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const TOKEN_KEY = '@auth_token'
const USER_KEY = '@user_data'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY)
      const userData = await AsyncStorage.getItem(USER_KEY)

      if (token && userData) {
        api.setToken(token)
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error('Auth check error:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await api.login(username, password)
      const { token, user: userData } = response.data.data

      await AsyncStorage.setItem(TOKEN_KEY, token)
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData))

      api.setToken(token)
      setUser(userData)
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await api.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      await AsyncStorage.removeItem(TOKEN_KEY)
      await AsyncStorage.removeItem(USER_KEY)
      api.setToken('')
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
