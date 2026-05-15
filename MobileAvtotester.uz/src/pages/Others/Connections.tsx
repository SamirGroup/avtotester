import { useState, useEffect } from 'react'
import { MessageSquare, Instagram, Youtube, Phone } from 'lucide-react'

export default function Connections() {
  const [connections, setConnections] = useState({
    telegram: '',
    instagram: '',
    youtube: '',
    phone: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadConnections()
  }, [])

  const loadConnections = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/public/connection/')
      const data = await response.json()
      setConnections(data.data || {})
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
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-12">
          <MessageSquare className="w-24 h-24 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Aloqa</h1>
          <p className="text-xl opacity-90">Biz bilan bog'laning</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {connections.telegram && (
            <a href={connections.telegram} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Telegram</h3>
                  <p className="text-gray-600">{connections.telegram}</p>
                </div>
              </div>
            </a>
          )}

          {connections.instagram && (
            <a href={connections.instagram} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-4">
                <div className="bg-pink-100 p-4 rounded-full">
                  <Instagram className="w-8 h-8 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Instagram</h3>
                  <p className="text-gray-600">{connections.instagram}</p>
                </div>
              </div>
            </a>
          )}

          {connections.youtube && (
            <a href={connections.youtube} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <Youtube className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">YouTube</h3>
                  <p className="text-gray-600">{connections.youtube}</p>
                </div>
              </div>
            </a>
          )}

          {connections.phone && (
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Telefon</h3>
                  <p className="text-gray-600">{connections.phone}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
