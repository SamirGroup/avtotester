import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react'

interface Theme {
  id: number
  name: string
  test_count: number
}

export default function ThemeManagement() {
  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null)
  const [name, setName] = useState('')

  useEffect(() => {
    loadThemes()
  }, [])

  const loadThemes = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/theme/', {
        headers: { 'Authorization': localStorage.getItem('token') || '' }
      })
      const data = await response.json()
      setThemes(data.data || [])
    } catch (error) {
      console.error('Mavzular yuklash xatosi:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    try {
      const url = editingTheme 
        ? `http://localhost:8000/api/admin/theme/${editingTheme.id}/`
        : 'http://localhost:8000/api/admin/theme/'
      
      const method = editingTheme ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token') || ''
        },
        body: JSON.stringify({ name })
      })

      if (response.ok) {
        setShowModal(false)
        setName('')
        setEditingTheme(null)
        loadThemes()
      }
    } catch (error) {
      console.error('Saqlash xatosi:', error)
    }
  }

  const handleEdit = (theme: Theme) => {
    setEditingTheme(theme)
    setName(theme.name)
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Rostdan ham o\'chirmoqchimisiz?')) return

    try {
      const response = await fetch(`http://localhost:8000/api/admin/theme/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.getItem('token') || ''
        }
      })

      if (response.ok) {
        loadThemes()
      }
    } catch (error) {
      console.error('O\'chirish xatosi:', error)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mavzular Boshqaruvi</h1>
          <p className="text-gray-600">Test mavzularini qo'shish va tahrirlash</p>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Yangi mavzu
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">{themes.length}</div>
              <div className="text-gray-600">Jami mavzular</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mavzu nomi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Testlar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amallar</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">Yuklanmoqda...</td>
              </tr>
            ) : themes.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">Mavzular yo'q</td>
              </tr>
            ) : (
              themes.map((theme) => (
                <tr key={theme.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{theme.id}</td>
                  <td className="px-6 py-4 font-medium">{theme.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{theme.test_count} ta</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(theme)} className="p-2 hover:bg-blue-100 rounded">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button onClick={() => handleDelete(theme.id)} className="p-2 hover:bg-red-100 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingTheme ? 'Mavzuni tahrirlash' : 'Yangi mavzu'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mavzu nomi
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Mavzu nomini kiriting"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Saqlash
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setName('')
                    setEditingTheme(null)
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
