import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, Clock, AlertTriangle, Shield } from 'lucide-react'
import server from '../../../utils/Backend'

export default function Exam() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const startExam = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await server.startExam(20)
      navigate(`/test/${response.data.result.id}`)
    } catch (err: any) {
      setError(err.message || 'Imtihonni boshlashda xatolik')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-orange-600">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-12">
          <Trophy className="w-24 h-24 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Imtihon Rejimi</h1>
          <p className="text-xl opacity-90">Haqiqiy imtihon sharoiti</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Rules */}
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Imtihon Qoidalari</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Savollar soni</h3>
                  <p className="text-gray-600">Jami 20 ta tasodifiy savol</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Vaqt limiti</h3>
                  <p className="text-gray-600">20 daqiqa (har bir savolga 1 daqiqa)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Xato cheklovi</h3>
                  <p className="text-gray-600">Maksimal 3 ta xato (3-xatoda imtihon tugaydi)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">O'tish mezoni</h3>
                  <p className="text-gray-600">Kamida 18 ta to'g'ri javob (90%)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Warning */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={startExam}
            disabled={loading}
            className="w-full bg-white text-red-600 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? 'Yuklanmoqda...' : 'Imtihonni Boshlash'}
          </button>

          <p className="text-center text-white/80 mt-4 text-sm">
            Diqqat: Imtihonni boshlagach, vaqt oqimi boshlanadi
          </p>
        </div>
      </div>
    </div>
  )
}
