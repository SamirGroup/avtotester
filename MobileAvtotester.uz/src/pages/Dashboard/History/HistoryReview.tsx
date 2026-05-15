import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react'

interface TestDetail {
  test_id: number
  test_value: string
  variant_orders: number[]
  current_answer_id: number | null
  selected: boolean
  successful: boolean | null
  correct_variant_value: string
  selected_variant_value: string | null
}

export default function HistoryReview() {
  const { resultId } = useParams()
  const navigate = useNavigate()
  const [tests, setTests] = useState<TestDetail[]>([])
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadResultDetails()
  }, [resultId])

  const loadResultDetails = async () => {
    try {
      const token = localStorage.getItem('token')
      const [detailsRes, resultRes] = await Promise.all([
        fetch(`http://localhost:8000/api/result/${resultId}/tests/`, {
          headers: { 'Authorization': token || '' }
        }),
        fetch(`http://localhost:8000/api/result/${resultId}/statistics/`, {
          headers: { 'Authorization': token || '' }
        })
      ])

      const detailsData = await detailsRes.json()
      const resultData = await resultRes.json()

      setTests(detailsData.data || [])
      setResult(resultData.data)
    } catch (error) {
      console.error('Ma\'lumotlar yuklash xatosi:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-600">Yuklanmoqda...</p></div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/history')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Orqaga</span>
        </button>

        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Natija Tafsilotlari</h1>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Test turi</div>
                <div className="text-xl font-bold text-gray-800">{result.test_type}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Natija</div>
                <div className={`text-xl font-bold ${result.percentage >= 90 ? 'text-green-600' : result.percentage >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {result.true_answers} / {result.test_length} ({result.percentage.toFixed(1)}%)
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Vaqt</div>
                <div className="flex items-center gap-2 text-gray-800">
                  <Clock className="w-5 h-5" />
                  {result.duration || '-'}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {tests.map((test, index) => (
            <div key={test.test_id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-800 mb-4">{test.test_value}</p>

                  <div className="space-y-2">
                    {test.variant_orders.map((variantId, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg border-2 ${
                          test.successful === true && i === test.variant_orders.indexOf(test.correct_variant_value)
                            ? 'bg-green-50 border-green-500'
                            : test.selected && test.successful === false && variantId === test.current_answer_id
                            ? 'bg-red-50 border-red-500'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {test.successful === true && i === test.variant_orders.indexOf(test.correct_variant_value) && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                          {test.selected && test.successful === false && variantId === test.current_answer_id && (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <span className="text-gray-800">
                            {variantId === test.correct_variant_value ? test.correct_variant_value : 
                             variantId === test.current_answer_id ? test.selected_variant_value : `Variant ${i + 1}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
