import { useState, useEffect } from 'react'
import { Settings, Save } from 'lucide-react'

interface Connections {
  telegram: string
  instagram: string
  youtube: string
  phone: string
}

export default function ConnectionsManagement() {
  const [connections, setConnections] = useState<Connections>({
    telegram: '',
    instagram: '',
    youtube: '',
    phone: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadConnections()
  }, [])

  const loadConnections = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/public/connection/', {
        headers: { 'Authorization': token || '' }
      })
      const data = await response.json()
      setConnections(data.data || {})
    } catch (error) {
      console.error('Ma\'lumotlar yuklash xatosi:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/public/connection/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token || ''
        },
        body: JSON.stringify(connections)
      })
      if (response.ok) {
        alert('Saqlandi!')
      }
    } catch (error) {
      console.error('Saqlash xatosi:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (key: keyof Connections, value: string) => {
    setConnections(prev => ({ ...prev, [key]: value }))
  }

  if (loading) return <div className="p-6 text-center">Yuklanmoqda...</div>

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Settings className="w-10 h-10 text-purple-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Aloqa Ma\'lumotlari</h1>
          <p className="text-gray-600">Platforma aloqa ma\'lumotlarini boshqarish</p>
        </div>
      </div>

      <div className="max-w-2xl bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telegram</label>
            <input
              type="text"
              value={connections.telegram}
              onChange={(e) => handleChange('telegram', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="https://t.me/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
            <input
              type="text"
              value={connections.instagram}
              onChange={(e) => handleChange('instagram', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="https://instagram.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
            <input
              type="text"
              value={connections.youtube}
              onChange={(e) => handleChange('youtube', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="https://youtube.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
            <input
              type="text"
              value={connections.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="+998 90 123 45 67"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saqlanmoqda...' : 'Saqlash'}
          </button>
        </div>
      </div>
    </div>
  )
}
