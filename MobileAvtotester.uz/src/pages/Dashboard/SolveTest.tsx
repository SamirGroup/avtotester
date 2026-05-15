import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronRight, CheckCircle, XCircle, Clock } from 'lucide-react'
import server from '../../utils/Backend'

interface Variant {
  id: number
  value: string
  is_correct?: boolean
}

interface TestSheet {
  id: number
  test: {
    id: number
    value: string
    image_url?: string | null
  }
  all_variants: Variant[]
  selected_variant?: Variant | null
  selected: boolean
  successful?: boolean | null
  correct_answer_value?: string
}

interface Result {
  id: number
  test_length: number
  true_answers: number
  incorrect_answers: number
  test_type: string
  finished: boolean
}

export default function SolveTest() {
  const { resultId } = useParams<{ resultId: string }>()
  const navigate = useNavigate()
  
  const [currentSheet, setCurrentSheet] = useState<TestSheet | null>(null)
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0)
  const [sheets, setSheets] = useState<TestSheet[]>([])
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [timer, setTimer] = useState(0)
  const [timeExpired, setTimeExpired] = useState(false)

  useEffect(() => {
    if (resultId) {
      loadTest(resultId)
    }
  }, [resultId])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (result?.test_type === 'EXAM' && !result.finished && !timeExpired) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev >= 1200) {
            setTimeExpired(true)
            handleFinish()
            return 1200
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [result, timeExpired])

  const loadTest = async (id: string) => {
    try {
      const tests = await server.request('GET', `/result/${id}/tests/`)
      setSheets(tests.data)
      setCurrentSheet(tests.data[0])
      
      const results = await server.getResults(1)
      setResult(results.find((r: any) => r.id === parseInt(id)))
    } catch (error) {
      console.error('Test yuklash xatosi:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleVariantSelect = (variantId: number) => {
    if (!currentSheet?.selected) {
      setSelectedVariant(variantId)
    }
  }

  const handleSubmitAnswer = async () => {
    if (!currentSheet || !selectedVariant || submitting) return
    
    setSubmitting(true)
    
    try {
      const response = await server.answer(currentSheet.id, selectedVariant)
      
      const updatedSheet = {
        ...currentSheet,
        selected: true,
        selected_variant: response.data.all_variants.find((v: Variant) => v.id === selectedVariant),
        successful: response.data.is_correct
      }
      
      setCurrentSheet(updatedSheet)
      
      if (response.data.result) {
        setResult(response.data.result)
      }
      
      const nextIndex = currentSheetIndex + 1
      if (nextIndex < sheets.length) {
        setCurrentSheetIndex(nextIndex)
        setCurrentSheet(sheets[nextIndex])
        setSelectedVariant(null)
      } else if (response.data.finished) {
        navigate(`/test_result/${result?.id}`)
      }
    } catch (error: any) {
      console.error('Javob yuborish xatosi:', error)
      if (error.message?.includes('3 xato')) {
        navigate(`/test_result/${result?.id}`)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleFinish = async () => {
    if (!result?.id) return
    
    try {
      await server.finish(result.id)
      navigate(`/test_result/${result.id}`)
    } catch (error) {
      console.error('Testni tugatish xatosi:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">Test yuklanmoqda...</div>
      </div>
    )
  }

  if (!currentSheet || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-red-500">Test topilmadi</div>
      </div>
    )
  }

  const progress = ((currentSheetIndex + 1) / result.test_length) * 100

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {result.test_type === 'EXAM' ? 'Imtihon' : 'Test'}
              </h1>
              <p className="text-sm text-gray-600">
                {currentSheetIndex + 1} / {result.test_length}
              </p>
            </div>
            
            {result.test_type === 'EXAM' && !result.finished && (
              <div className={`flex items-center gap-2 ${timeExpired ? 'text-red-600' : 'text-blue-600'}`}>
                <Clock className="w-5 h-5" />
                <span className="font-mono font-semibold text-lg">
                  {formatTime(1200 - timer)}
                </span>
              </div>
            )}
          </div>
          
          <div className="mt-3 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-green-600">{result.true_answers}</span>
              <span className="text-gray-600">To'g'ri</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="font-semibold text-red-600">{result.incorrect_answers}</span>
              <span className="text-gray-600">Xato</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <span className="bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded-full text-sm">
              Savol {currentSheetIndex + 1}
            </span>
          </div>
          
          <p className="text-lg text-gray-800 mb-4">{currentSheet.test.value}</p>
          
          {currentSheet.test.image_url && (
            <img 
              src={currentSheet.test.image_url} 
              alt="Test rasmi" 
              className="max-w-full h-auto rounded-lg border mb-4"
            />
          )}
        </div>

        {/* Variants */}
        <div className="space-y-3">
          {currentSheet.all_variants.map((variant, index) => {
            const isSelected = selectedVariant === variant.id
            const isCorrect = variant.is_correct
            const showResult = currentSheet.selected

            let buttonClass = 'border-2 border-gray-200 hover:border-blue-400'
            
            if (showResult) {
              if (isCorrect) {
                buttonClass = 'border-2 border-green-500 bg-green-50'
              } else if (isSelected && !isCorrect) {
                buttonClass = 'border-2 border-red-500 bg-red-50'
              }
            } else if (isSelected) {
              buttonClass = 'border-2 border-blue-500 bg-blue-50'
            }

            return (
              <button
                key={variant.id}
                onClick={() => handleVariantSelect(variant.id)}
                disabled={currentSheet.selected || submitting}
                className={`w-full text-left p-4 rounded-lg transition ${buttonClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{variant.value}</span>
                  {showResult && isCorrect && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Submit button */}
        {!currentSheet.selected && (
          <div className="mt-6">
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedVariant || submitting}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? 'Yuborilmoqda...' : (
                <>
                  Javobni tasdiqlash
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Next button */}
        {currentSheet.selected && currentSheetIndex < sheets.length - 1 && (
          <div className="mt-6">
            <button
              onClick={() => {
                setCurrentSheetIndex(currentSheetIndex + 1)
                setCurrentSheet(sheets[currentSheetIndex + 1])
                setSelectedVariant(null)
              }}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              Keyingi savol
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Finish button */}
        {currentSheet.selected && currentSheetIndex === sheets.length - 1 && (
          <div className="mt-6">
            <button
              onClick={handleFinish}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Testni tugatish
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
