import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { User } from '../utils/Backend'

// Pages
import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
import About from '../pages/About/About'
import Connections from '../pages/Others/Connections'
import NotFound from '../pages/Others/NotFound'

// Dashboard
import Dashboard from '../pages/Dashboard/Dashboard'
import ByTheme from '../pages/Dashboard/ByTheme/ByTheme'
import ByTicket from '../pages/Dashboard/ByTicket/ByTicket'
import SetTests from '../pages/Dashboard/SetTests/SetTests'
import Exam from '../pages/Dashboard/Exam/Exam'
import SolveTest from '../pages/Dashboard/SolveTest'
import TestResult from '../pages/Dashboard/TestResult'
import Statistics from '../pages/Dashboard/Statistics'
import History from '../pages/Dashboard/History/History'
import HistoryReview from '../pages/Dashboard/History/HistoryReview'

// Profile
import Profile from '../pages/profile/Profile'

// Admin
import AdminDashboard from '../pages/Admin/AdminDashboard'

interface AuthProps {
  isAuthenticated: boolean
  user: User | null
  onLogout: () => void
  checkAuth: () => void
}

interface AppRoutesProps {
  auth: AuthProps
}

// Protected Route Component
const ProtectedRoute = ({ children, auth, adminOnly = false }: { 
  children: React.ReactNode 
  auth: AuthProps
  adminOnly?: boolean
}) => {
  const location = useLocation()

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (adminOnly && auth.user?.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export default function AppRoutes({ auth }: AppRoutesProps) {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login checkAuth={auth.checkAuth} />} />
      <Route path="/about" element={<About />} />
      <Route path="/connections" element={<Connections />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute auth={auth}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/themes"
        element={
          <ProtectedRoute auth={auth}>
            <ByTheme />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tickets"
        element={
          <ProtectedRoute auth={auth}>
            <ByTicket />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settests"
        element={
          <ProtectedRoute auth={auth}>
            <SetTests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exam"
        element={
          <ProtectedRoute auth={auth}>
            <Exam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/test/:resultId"
        element={
          <ProtectedRoute auth={auth}>
            <SolveTest />
          </ProtectedRoute>
        }
      />
      <Route
        path="/test_result/:resultId"
        element={
          <ProtectedRoute auth={auth}>
            <TestResult />
          </ProtectedRoute>
        }
      />
      <Route
        path="/statistics"
        element={
          <ProtectedRoute auth={auth}>
            <Statistics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute auth={auth}>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history/:resultId"
        element={
          <ProtectedRoute auth={auth}>
            <HistoryReview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute auth={auth}>
            <Profile user={auth.user} onLogout={auth.onLogout} />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute auth={auth} adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
