import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import server, { User } from './utils/Backend'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const profile = await server.getProfile()
        setUser(profile)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('token')
        server.auth.token = null
      }
    }
    setIsLoading(false)
  }

  const handleLogout = async () => {
    try {
      await server.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsAuthenticated(false)
      setUser(null)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">Yuklanmoqda...</div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <AppRoutes
        auth={{
          isAuthenticated,
          user,
          onLogout: handleLogout,
          checkAuth,
        }}
      />
    </BrowserRouter>
  )
}

export default App
