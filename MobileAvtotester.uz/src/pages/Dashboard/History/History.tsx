import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { History as HistoryIcon, ChevronRight, FileText } from 'lucide-react'

interface Result {
  id: number
  test_type: string
  true_answers: number
  incorrect_answers: number
  test_length: number
  percentage: number
  finished: boolean
  start_time: string
  end_time: string
}

export default function History() {
  const navigate = useNavigate()
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/history/', {
        headers: { 'Authorization': token || '' }
      })
      const data = await response.json()
      setResults(data.data || [])
    } catch (error) {
      console.error('Tarix yuklash xatosi:', error)
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <HistoryIcon className="w-10 h-10 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Test Tarixi</h1>
            <p className="text-gray-600">O'tgan testlar ro'yxati</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12"><p className="text-gray-600">Yuklanmoqda...</p></div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Hozircha testlar yo'q</p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result.id}
                onClick={() => navigate(`/history/${result.id}`)}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${getTypeColor(result.test_type)}`}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{result.test_type}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${result.percentage >= 90 ? 'bg-green-100 text-green-800' : result.percentage >= 70 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {result.percentage.toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {result.true_answers} / {result.test_length} to'g'ri
                        {result.incorrect_answers > 0 && <span className="text-red-600">, {result.incorrect_answers} xato</span>}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(result.start_time).toLocaleString('uz-UZ')}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
