import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, ChevronRight } from 'lucide-react'
import server from '../../../utils/Backend'

interface Theme {
  id: number
  name: string
  test_count: number
}

export default function ByTheme() {
  const navigate = useNavigate()
  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadThemes()
  }, [])

  const loadThemes = async () => {
    try {
      const data = await server.getThemes()
      setThemes(data)
    } catch (error) {
      console.error('Mavzular yuklash xatosi:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStart = (themeId: number) => {
    server.startTheme(themeId)
      .then(response => {
        navigate(`/test/${response.data.result.id}`)
      })
      .catch(error => {
        console.error('Test boshlash xatosi:', error)
        alert(error.message || 'Testni boshlashda xatolik')
      })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <BookOpen className="w-10 h-10 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Mavzu bo'yicha testlar</h1>
            <p className="text-gray-600">Yo'l harakati qoidalari bo'yicha mavzular</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Yuklanmoqda...</p>
          </div>
        ) : themes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Mavzular topilmadi</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
                onClick={() => handleStart(theme.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {theme.test_count} ta test
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{theme.name}</h3>
                <div className="flex items-center gap-2 text-blue-600 mt-4">
                  <span className="font-semibold">Boshlash</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
