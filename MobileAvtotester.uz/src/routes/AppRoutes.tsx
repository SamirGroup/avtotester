import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
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
import Profile from '../pages/profile/Profile'
import About from '../pages/About/About'
import Connections from '../pages/Others/Connections'
import NotFound from '../pages/Others/NotFound'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import SuperAdminDashboard from '../pages/SuperAdmin/SuperAdminDashboard'

interface AppRoutesProps {
  auth: boolean
  onLogout: () => void
}

const ProtectedRoute = ({ children, auth }: { children: React.ReactNode; auth: boolean }) => {
  if (!auth) return <Navigate to="/login" replace />
  return <>{children}</>
}

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('role')
  
  if (!token || !['ADMIN', 'TENANT_ADMIN', 'SUPERADMIN'].includes(userRole || '')) {
    return <Navigate to="/" replace />
  }
  
  return <>{children}</>
}

const SuperAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('role')

  if (!token || userRole !== 'SUPERADMIN') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default function AppRoutes({ auth, onLogout }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/connections" element={<Connections />} />
      <Route path="/not-found" element={<NotFound />} />

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
            <Profile user={{}} onLogout={onLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/superadmin/*"
        element={
          <SuperAdminRoute>
            <SuperAdminDashboard />
          </SuperAdminRoute>
        }
      />

      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  )
}
