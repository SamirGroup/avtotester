import { useState, useEffect } from 'react'
import {
  Building2, Users, DollarSign, BarChart3, FileText,
  TrendingUp, Settings, Layout, ChevronRight, Eye,
  Plus, Search, Filter
} from 'lucide-react'
import OrganizationList from './components/OrganizationList'
import OrganizationDetail from './components/OrganizationDetail'
import ContractManagement from './components/ContractManagement'
import RevenueReports from './components/RevenueReports'
import SuperAdminStats from './components/SuperAdminStats'
import server from '../../utils/Backend'

const menuItems = [
  { id: 'dashboard', icon: Layout, label: 'Dashboard' },
  { id: 'organizations', icon: Building2, label: 'Ijarachilar' },
  { id: 'contracts', icon: FileText, label: 'Shartnomalar' },
  { id: 'revenue', icon: DollarSign, label: 'Kirimlar' },
  { id: 'statistics', icon: BarChart3, label: 'Statistika' },
]

export default function SuperAdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const response = await server.superadminDashboard()
      setDashboardData(response)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleOrgSelect = (orgId: number) => {
    setSelectedOrgId(orgId)
    setActiveMenu('org_detail')
  }

  const handleBack = () => {
    setSelectedOrgId(null)
    setActiveMenu('organizations')
  }

  const renderContent = () => {
    if (activeMenu === 'org_detail' && selectedOrgId) {
      return <OrganizationDetail orgId={selectedOrgId} onBack={handleBack} />
    }

    switch (activeMenu) {
      case 'organizations':
        return <OrganizationList onSelect={handleOrgSelect} />
      case 'contracts':
        return <ContractManagement />
      case 'revenue':
        return <RevenueReports />
      case 'statistics':
        return <SuperAdminStats />
      case 'dashboard':
      default:
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Superadmin Dashboard</h1>
            {loading ? (
              <div className="text-center py-10">Yuklanmoqda...</div>
            ) : dashboardData ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow p-6">
                    <Building2 className="w-8 h-8 text-blue-600 mb-4" />
                    <div className="text-3xl font-bold text-gray-800">{dashboardData.total_organizations}</div>
                    <div className="text-gray-600">Jami ijarachilar</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Demo: {dashboardData.demo_organizations} | Faol: {dashboardData.active_organizations}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <Users className="w-8 h-8 text-green-600 mb-4" />
                    <div className="text-3xl font-bold text-gray-800">{dashboardData.total_students}</div>
                    <div className="text-gray-600">Jami o'quvchilar</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Faol: {dashboardData.active_students}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <DollarSign className="w-8 h-8 text-purple-600 mb-4" />
                    <div className="text-3xl font-bold text-gray-800">
                      {dashboardData.total_revenue?.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Jami kirim (so'm)</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <TrendingUp className="w-8 h-8 text-red-600 mb-4" />
                    <div className="text-3xl font-bold text-gray-800">
                      {dashboardData.total_platform_fees?.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Platforma ulushi (so'm)</div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Oylik dinamika</h2>
                    <div className="h-64 flex items-end justify-around gap-2">
                      {dashboardData.monthly_revenue?.map((m: any, i: number) => (
                        <div key={i} className="flex flex-col items-center flex-1">
                          <div className="text-xs text-gray-500 mb-1">{Math.round(m.platform_fee / 1000)}k</div>
                          <div
                            className="w-full bg-blue-500 rounded-t"
                            style={{
                              height: `${Math.max(10, (m.platform_fee / (dashboardData.total_platform_fees || 1)) * 200)}px`
                            }}
                          />
                          <div className="text-xs text-gray-600 mt-1">{m.month_name?.slice(0, 3)}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Eng faol ijarachilar</h2>
                    <div className="space-y-3">
                      {dashboardData.top_organizations?.map((org: any) => (
                        <div
                          key={org.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                          onClick={() => handleOrgSelect(org.id)}
                        >
                          <div>
                            <div className="font-semibold text-gray-800">{org.name}</div>
                            <div className="text-sm text-gray-500">{org.student_count} o'quvchi</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{org.revenue?.toLocaleString()} so'm</div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              org.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                              org.status === 'DEMO' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {org.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-gray-900 text-white min-h-screen">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Superadmin</h1>
          <p className="text-gray-400 text-sm mt-1">Platforma boshqaruvi</p>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveMenu(item.id); setSelectedOrgId(null) }}
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
