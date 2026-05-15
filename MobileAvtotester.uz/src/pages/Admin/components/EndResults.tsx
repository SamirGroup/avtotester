import { useState, useEffect } from 'react'
import { FileText, TrendingUp } from 'lucide-react'

interface Result {
  id: number
  user: string
  test_type: string
  true_answers: number
  incorrect_answers: number
  test_length: number
  percentage: number
  finished: boolean
  start_time: string
  end_time: string
}

export default function EndResults() {
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadResults()
  }, [])

  const loadResults = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/results/', {
        headers: { 'Authorization': token || '' }
      })
      const data = await response.json()
      setResults(data.data || [])
    } catch (error) {
      console.error('Natijalar yuklash xatosi:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'EXAM': return 'bg-red-100 text-red-800'
      case 'THEME': return 'bg-blue-100 text-blue-800'
      case 'TICKET': return 'bg-green-100 text-green-800'
      case 'SETTEST': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800'
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <FileText className="w-10 h-10 text-green-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Imtihon Natijalari</h1>
          <p className="text-gray-600">Barcha foydalanuvchi natijalari</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Foydalanuvchi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Turi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Natija</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Foiz</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vaqt</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={7} className="px-6 py-4 text-center">Yuklanmoqda...</td></tr>
            ) : results.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-4 text-center text-gray-500">Natijalar yo'q</td></tr>
            ) : (
              results.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{result.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{result.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(result.test_type)}`}>
                      {result.test_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {result.true_answers} / {result.test_length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(result.percentage)}`}>
                      {result.percentage.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${result.finished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {result.finished ? 'Tugallangan' : 'Tugallanmagan'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(result.start_time).toLocaleString('uz-UZ')}
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
