import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Check, X } from 'lucide-react'

interface Test { id: number; value: string; active: boolean; theme_name?: string; ticket_name?: string }
interface Theme { id: number; name: string }
interface Ticket { id: number; name: string }
interface Variant { id: number; value: string }

export default function TestManagement() {
  const [tests, setTests] = useState<Test[]>([])
  const [themes, setThemes] = useState<Theme[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTest, setEditingTest] = useState<Test | null>(null)
  const [variants, setVariants] = useState<Variant[]>([])
  const [correctVariantId, setCorrectVariantId] = useState<number | null>(null)
  const [value, setValue] = useState('')
  const [themeId, setThemeId] = useState('')
  const [ticketId, setTicketId] = useState('')
  const [active, setActive] = useState(true)
  const [variantText, setVariantText] = useState('')

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    try {
      const token = localStorage.getItem('token')
      const headers = { 'Authorization': token || '' }
      const [testsRes, themesRes, ticketsRes] = await Promise.all([
        fetch('http://localhost:8000/api/admin/test/', { headers }),
        fetch('http://localhost:8000/api/admin/theme/', { headers }),
        fetch('http://localhost:8000/api/admin/ticket/', { headers })
      ])
      setTests((await testsRes.json()).data || [])
      setThemes((await themesRes.json()).data || [])
      setTickets((await ticketsRes.json()).data || [])
    } catch (error) { console.error('Xato:', error) }
    finally { setLoading(false) }
  }

  const loadVariants = async (testId: number) => {
    try {
      const token = localStorage.getItem('token')
      const data = await (await fetch(`http://localhost:8000/api/admin/test/${testId}/variant/`, { headers: { 'Authorization': token || '' } })).json()
      setVariants(data.data || [])
    } catch (error) { console.error('Xato:', error) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    try {
      const token = localStorage.getItem('token')
      const url = editingTest ? `http://localhost:8000/api/admin/test/${editingTest.id}/` : 'http://localhost:8000/api/admin/test/'
      const response = await fetch(url, {
        method: editingTest ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token || '' },
        body: JSON.stringify({ value, theme_id: themeId || null, ticket_id: ticketId || null, active })
      })
      if (response.ok) { setShowModal(false); resetForm(); loadData() }
    } catch (error) { console.error('Xato:', error) }
  }

  const handleAddVariant = async () => {
    if (!variantText.trim() || !editingTest) return
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8000/api/admin/test/${editingTest.id}/variant/`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': token || '' },
        body: JSON.stringify({ value: variantText })
      })
      if (response.ok) { const data = await response.json(); setVariants([...variants, data.data]); setVariantText('') }
    } catch (error) { console.error('Xato:', error) }
  }

  const handleSetCorrectAnswer = async (variantId: number) => {
    if (!editingTest) return
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8000/api/admin/test/variant/${variantId}/true/`, { method: 'POST', headers: { 'Authorization': token || '' } })
      if (response.ok) { setCorrectVariantId(variantId); loadVariants(editingTest.id) }
    } catch (error) { console.error('Xato:', error) }
  }

  const handleDeleteVariant = async (variantId: number) => {
    if (!confirm('O\'chirmoqchimisiz?')) return
    try {
      const token = localStorage.getItem('token')
      await fetch(`http://localhost:8000/api/admin/test/variant/${variantId}/`, { method: 'DELETE', headers: { 'Authorization': token || '' } })
      if (editingTest) loadVariants(editingTest.id)
    } catch (error) { console.error('Xato:', error) }
  }

  const handleEdit = async (test: Test) => {
    setEditingTest(test); setValue(test.value); setThemeId(test.theme_name || ''); setTicketId(test.ticket_name || ''); setActive(test.active); setVariants([])
    await loadVariants(test.id); setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('O\'chirmoqchimisiz?')) return
    try {
      const token = localStorage.getItem('token')
      await fetch(`http://localhost:8000/api/admin/test/${id}/`, { method: 'DELETE', headers: { 'Authorization': token || '' } })
      if (window.confirm('Rostdan ham o\'chirmoqchimisiz?')) loadData()
    } catch (error) { console.error('Xato:', error) }
  }

  const resetForm = () => { setValue(''); setThemeId(''); setTicketId(''); setActive(true); setVariants([]); setEditingTest(null) }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-3xl font-bold text-gray-800">Testlar Boshqaruvi</h1><p className="text-gray-600">Test savollarini qo'shish va tahrirlash</p></div>
        <button onClick={() => setShowModal(true)} className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center gap-2"><Plus className="w-5 h-5" /> Yangi test</button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6"><div className="text-3xl font-bold text-gray-800">{tests.length}</div><div className="text-gray-600">Jami testlar</div></div>
        <div className="bg-white rounded-lg shadow p-6"><div className="text-3xl font-bold text-green-600">{tests.filter(t => t.active).length}</div><div className="text-gray-600">Faol testlar</div></div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Savol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mavzu</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bilet</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amallar</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? <tr><td colSpan={6} className="px-6 py-4 text-center">Yuklanmoqda...</td></tr> : tests.length === 0 ? <tr><td colSpan={6} className="px-6 py-4 text-center text-gray-500">Testlar yo'q</td></tr> : tests.map((test) => (
              <tr key={test.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{test.id}</td>
                <td className="px-6 py-4 max-w-xs truncate">{test.value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{test.theme_name || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{test.ticket_name || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${test.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{test.active ? 'Faol' : 'Nofaol'}</span></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center gap-2"><button onClick={() => handleEdit(test)} className="p-2 hover:bg-blue-100 rounded"><Edit className="w-4 h-4 text-blue-600" /></button><button onClick={() => handleDelete(test.id)} className="p-2 hover:bg-red-100 rounded"><Trash2 className="w-4 h-4 text-red-600" /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl m-4 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{editingTest ? 'Testni tahrirlash' : 'Yangi test'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Savol matni *</label><textarea value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows={3} required /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Mavzu</label><select value={themeId} onChange={(e) => setThemeId(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option value="">Tanlang</option>{themes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Bilet</label><select value={ticketId} onChange={(e) => setTicketId(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option value="">Tanlang</option>{tickets.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
                </div>
                <div className="flex items-center gap-2"><input type="checkbox" id="active" checked={active} onChange={(e) => setActive(e.target.checked)} className="w-4 h-4" /><label htmlFor="active" className="text-sm font-medium text-gray-700">Faol</label></div>
                {editingTest && (
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-3">Javob variantlari</h3>
                    <div className="space-y-2 mb-4">{variants.map((variant) => (
                      <div key={variant.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <button type="button" onClick={() => handleSetCorrectAnswer(variant.id)} className={`p-1 rounded ${correctVariantId === variant.id ? 'bg-green-500' : 'bg-gray-200'}`}><Check className="w-4 h-4 text-white" /></button>
                        <span className="flex-1">{variant.value}</span>
                        <button type="button" onClick={() => handleDeleteVariant(variant.id)} className="p-1 hover:bg-red-100 rounded"><X className="w-4 h-4 text-red-600" /></button>
                      </div>
                    ))}</div>
                    <div className="flex gap-2"><input type="text" value={variantText} onChange={(e) => setVariantText(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" placeholder="Yangi variant" /><button type="button" onClick={handleAddVariant} className="bg-purple-600 text-white px-4 py-2 rounded-lg">Qo'shish</button></div>
                    {correctVariantId && <p className="text-sm text-green-600 mt-2">To'g'ri javob belgilandi</p>}
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-6"><button type="submit" className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700">Saqlash</button><button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300">Bekor qilish</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
