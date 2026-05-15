import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, Trophy, AlertTriangle, Home } from 'lucide-react'
import server from '../../utils/Backend'

export default function TestResult() {
  const { resultId } = useParams<{ resultId: string }>()
  const navigate = useNavigate()
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (resultId) {
      loadResult(resultId)
    }
  }, [resultId])

  const loadResult = async (id: string) => {
    try {
      const results = await server.getResults(50)
      const found = results.find((r: any) => r.id === parseInt(id))
      setResult(found)
    } catch (error) {
      console.error('Natija yuklash xatosi:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">Yuklanmoqda...</div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-red-500">Natija topilmadi</div>
      </div>
    )
  }

  const percentage = result.percentage || 0
  const isPassed = percentage >= 80
  const isExam = result.test_type === 'EXAM'
  const examPassed = isExam ? percentage >= 90 && result.incorrect_answers < 3 : true

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className={`py-12 ${isPassed ? 'bg-green-600' : 'bg-red-600'}`}>
        <div className="container mx-auto px-4 text-center text-white">
          {isPassed ? (
            <Trophy className="w-20 h-20 mx-auto mb-4" />
          ) : (
            <AlertTriangle className="w-20 h-20 mx-auto mb-4" />
          )}
          
          <h1 className="text-4xl font-bold mb-2">
            {isPassed ? 'Tabriklaymiz!' : 'Imtihondan o\'ta olmadingiz'}
          </h1>
          
          <p className="text-xl opacity-90">
            {isExam ? (
              examPassed ? 'Imtihondan muvaffaqiyatli o\'tdingiz!' : 'Imtihondan o\'ta olmadingiz'
            ) : (
              'Test yakunlandi'
            )}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {result.true_answers}
            </div>
            <div className="text-gray-600">To'g'ri javoblar</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">
              {result.incorrect_answers}
            </div>
            <div className="text-gray-600">Xato javoblar</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {percentage.toFixed(0)}%
            </div>
            <div className="text-gray-600">Natija</div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Test ma'lumotlari</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Test turi:</span>
              <span className="font-semibold">
                {result.test_type_display || result.test_type}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Savollar soni:</span>
              <span className="font-semibold">{result.test_length}</span>
            </div>
            
            {isExam && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">O'tish mezoni:</span>
                  <span className={`font-semibold ${examPassed ? 'text-green-600' : 'text-red-600'}`}>
                    {examPassed ? 'O\'tildi ✓' : 'O\'tilmadi ✗'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maximal xato:</span>
                  <span className="font-semibold">3 ta</span>
                </div>
              </>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-600">Boshlanish vaqti:</span>
              <span className="font-semibold">
                {new Date(result.start_time).toLocaleString('uz-UZ')}
              </span>
            </div>
            
            {result.end_time && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tugash vaqti:</span>
                <span className="font-semibold">
                  {new Date(result.end_time).toLocaleString('uz-UZ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate(`/history/${result.id}`)}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            Test tafsilotlari ko'rish
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Bosh sahifaga
          </button>
        </div>
      </div>
    </div>
  )
}
