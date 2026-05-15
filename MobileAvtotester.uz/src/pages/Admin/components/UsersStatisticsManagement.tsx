import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Users } from 'lucide-react'

interface UserStats {
  user_id: number
  username: string
  full_name: string
  total_tests: number
  finished_tests: number
  avg_score: number
  overall_percentage: number
}

export default function UsersStatisticsManagement() {
  const [stats, setStats] = useState<UserStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/admin/all_users_stats/', {
        headers: { 'Authorization': token || '' }
      })
      const data = await response.json()
      setStats(data.data || [])
    } catch (error) {
      console.error('Statistika yuklash xatosi:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <BarChart3 className="w-10 h-10 text-yellow-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Foydalanuvchilar Statistikasi</h1>
          <p className="text-gray-600">Barcha foydalanuvchilar natijalari</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg"><Users className="w-8 h-8 text-blue-600" /></div>
            <div>
              <div className="text-3xl font-bold text-gray-800">{stats.length}</div>
              <div className="text-gray-600">Jami foydalanuvchilar</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ism</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jami test</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tugallangan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">O'rtacha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Foiz</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={7} className="px-6 py-4 text-center">Yuklanmoqda...</td></tr>
            ) : stats.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-4 text-center text-gray-500">Ma'lumotlar yo'q</td></tr>
            ) : (
              stats.map((user) => (
                <tr key={user.user_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{user.user_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.full_name || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.total_tests}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.finished_tests}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.avg_score?.toFixed(1) || 0}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.overall_percentage >= 90 ? 'bg-green-100 text-green-800' :
                      user.overall_percentage >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.overall_percentage.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
