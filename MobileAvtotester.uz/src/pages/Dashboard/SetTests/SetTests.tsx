import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shuffle, ChevronRight } from 'lucide-react'
import server from '../../../utils/Backend'

export default function SetTests() {
  const navigate = useNavigate()
  const [count, setCount] = useState(20)
  const [loading, setLoading] = useState(false)

  const handleStart = () => {
    setLoading(true)
    server.startSettest(count)
      .then(response => navigate(`/test/${response.data.result.id}`))
      .catch(error => alert(error.message || 'Testni boshlashda xatolik'))
      .finally(() => setLoading(false))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Shuffle className="w-10 h-10 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Erkin test</h1>
            <p className="text-gray-600">Tasodifiy testlar</p>
          </div>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Savollar soni</label>
            <input type="number" min="1" max="100" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 1)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
            <p className="text-sm text-gray-600 mt-2">1 dan 100 gacha</p>
          </div>
          <button onClick={handleStart} disabled={loading} className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? 'Yuklanmoqda...' : <><Testni Boshlash /><ChevronRight className="w-5 h-5" /></>}
          </button>
        </div>
      </div>
    </div>
  )
}
