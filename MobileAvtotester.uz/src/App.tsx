import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import server from './utils/Backend'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const isAuth = server.checkAuth()
    setIsAuthenticated(isAuth)
    setLoading(false)
  }

  const handleLogout = async () => {
    try {
      await server.logout()
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout xatosi:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <AppRoutes auth={isAuthenticated} onLogout={handleLogout} />
    </BrowserRouter>
  )
}

export default App
