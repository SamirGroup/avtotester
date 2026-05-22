import { useState, useEffect } from 'react'
import { BarChart3, Users, DollarSign, Activity } from 'lucide-react'
import server from '../../../utils/Backend'

export default function SuperAdminStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const data = await server.superadminDashboard()
      setStats(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-6 text-center">Yuklanmoqda...</div>
  if (!stats) return <div className="p-6">Ma'lumot topilmadi</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Umumiy statistika</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <Users className="w-8 h-8 text-blue-600 mb-4" />
          <div className="text-3xl font-bold text-gray-800">{stats.total_organizations}</div>
          <div className="text-gray-600">Jami ijarachilar</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <Activity className="w-8 h-8 text-green-600 mb-4" />
          <div className="text-3xl font-bold text-gray-800">{stats.total_students}</div>
          <div className="text-gray-600">Jami o'quvchilar</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <DollarSign className="w-8 h-8 text-purple-600 mb-4" />
          <div className="text-3xl font-bold text-gray-800">{stats.total_revenue?.toLocaleString()}</div>
          <div className="text-gray-600">Jami kirim</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <BarChart3 className="w-8 h-8 text-orange-600 mb-4" />
          <div className="text-3xl font-bold text-gray-800">{stats.total_platform_fees?.toLocaleString()}</div>
          <div className="text-gray-600">Platforma daromadi</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Oylik kirim dinamikasi</h2>
          <div className="h-64 flex items-end justify-around gap-2">
            {stats.monthly_revenue?.map((m: any, i: number) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className="text-xs text-gray-500 mb-1">
                  {Math.round(m.revenue / 1000)}k
                </div>
                <div
                  className="w-full bg-blue-500 rounded-t"
                  style={{
                    height: `${Math.max(10, (m.revenue / (stats.total_revenue || 1)) * 200)}px`
                  }}
                />
                <div className="text-xs text-gray-600 mt-1">{m.month_name?.slice(0, 3)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Platforma daromadi dinamikasi</h2>
          <div className="h-64 flex items-end justify-around gap-2">
            {stats.monthly_revenue?.map((m: any, i: number) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className="text-xs text-gray-500 mb-1">
                  {Math.round(m.platform_fee / 1000)}k
                </div>
                <div
                  className="w-full bg-green-500 rounded-t"
                  style={{
                    height: `${Math.max(10, (m.platform_fee / (stats.total_platform_fees || 1)) * 200)}px`
                  }}
                />
                <div className="text-xs text-gray-600 mt-1">{m.month_name?.slice(0, 3)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
