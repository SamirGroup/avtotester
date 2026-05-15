import { useState } from 'react'
import { Users, BookOpen, Ticket, FileText, BarChart3, Settings, Layout, TrendingUp, MessageSquare } from 'lucide-react'
import UserManagement from './components/UserManagement'
import TestManagement from './components/TestManagement'
import ThemeManagement from './components/ThemeManagement'
import TicketManagement from './components/TicketManagement'
import UsersStatisticsManagement from './components/UsersStatisticsManagement'
import ConnectionsManagement from './components/ConnectionsManagement'
import EndResults from './components/EndResults'

const menuItems = [
  { id: 'dashboard', icon: Layout, label: 'Dashboard' },
  { id: 'users', icon: Users, label: 'Foydalanuvchilar' },
  { id: 'themes', icon: BookOpen, label: 'Mavzular' },
  { id: 'tickets', icon: Ticket, label: 'Biletlar' },
  { id: 'tests', icon: FileText, label: 'Testlar' },
  { id: 'statistics', icon: BarChart3, label: 'Statistika' },
  { id: 'user_stats', icon: TrendingUp, label: 'User Stats' },
  { id: 'results', icon: FileText, label: 'Natijalar' },
  { id: 'connections', icon: MessageSquare, label: 'Murojatlar' },
]

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard')

  const renderContent = () => {
    switch (activeMenu) {
      case 'users': return <UserManagement />
      case 'themes': return <ThemeManagement />
      case 'tickets': return <TicketManagement />
      case 'tests': return <TestManagement />
      case 'user_stats': return <UsersStatisticsManagement />
      case 'results': return <EndResults />
      case 'connections': return <ConnectionsManagement />
      case 'dashboard':
      default:
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <Users className="w-8 h-8 text-blue-600 mb-4" />
                <div className="text-3xl font-bold text-gray-800">150</div>
                <div className="text-gray-600">Foydalanuvchilar</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <BookOpen className="w-8 h-8 text-green-600 mb-4" />
                <div className="text-3xl font-bold text-gray-800">5</div>
                <div className="text-gray-600">Mavzular</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <Ticket className="w-8 h-8 text-purple-600 mb-4" />
                <div className="text-3xl font-bold text-gray-800">20</div>
                <div className="text-gray-600">Biletlar</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <FileText className="w-8 h-8 text-red-600 mb-4" />
                <div className="text-3xl font-bold text-gray-800">674</div>
                <div className="text-gray-600">Testlar</div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-gray-900 text-white min-h-screen">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-800 transition ${
                activeMenu === item.id ? 'bg-gray-800 border-l-4 border-blue-500' : ''
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  )
}
