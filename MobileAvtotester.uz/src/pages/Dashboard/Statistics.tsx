import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Award, Target } from 'lucide-react'
import server from '../utils/Backend'

export default function Statistics() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const data = await server.getStatistics()
      setStats(data)
    } catch (error) {
      console.error('Statistika yuklash xatosi:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-600">Yuklanmoqda...</p></div>

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <BarChart3 className="w-10 h-10 text-yellow-600" />
          <div><h1 className="text-3xl font-bold text-gray-800">Statistika</h1><p className="text-gray-600">Natijalar tahlili</p></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg"><TrendingUp className="w-8 h-8 text-blue-600" /></div>
              <div><div className="text-3xl font-bold text-gray-800">{stats?.total_tests || 0}</div><div className="text-gray-600">Jami testlar</div></div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg"><Award className="w-8 h-8 text-green-600" /></div>
              <div><div className="text-3xl font-bold text-gray-800">{stats?.finished_tests || 0}</div><div className="text-gray-600">Tugallangan</div></div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg"><Target className="w-8 h-8 text-purple-600" /></div>
              <div><div className="text-3xl font-bold text-gray-800">{stats?.avg_score?.toFixed(0) || 0}%</div><div className="text-gray-600">O'rtacha natija</div></div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-lg"><BarChart3 className="w-8 h-8 text-red-600" /></div>
              <div><div className="text-3xl font-bold text-gray-800">{stats?.overall_percentage?.toFixed(0) || 0}%</div><div className="text-gray-600">Umumiy foiz</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
