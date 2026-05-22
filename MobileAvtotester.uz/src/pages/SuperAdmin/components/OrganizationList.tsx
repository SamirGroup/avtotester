import { useState, useEffect } from 'react'
import { Search, Plus, Eye, Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react'
import server from '../../../utils/Backend'

interface Props {
  onSelect: (orgId: number) => void
}

export default function OrganizationList({ onSelect }: Props) {
  const [orgs, setOrgs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({
    name: '', slug: '', owner_name: '', phone: '', email: '',
    admin_username: '', admin_password: '', demo_days: 7,
    student_subscription_amount: 30000, platform_fee_percent: 20
  })

  useEffect(() => {
    loadOrgs()
  }, [statusFilter])

  const loadOrgs = async () => {
    setLoading(true)
    try {
      const data = await server.getOrganizations(statusFilter)
      setOrgs(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await server.createOrganization(form)
      setShowCreate(false)
      setForm({
        name: '', slug: '', owner_name: '', phone: '', email: '',
        admin_username: '', admin_password: '', demo_days: 7,
        student_subscription_amount: 30000, platform_fee_percent: 20
      })
      loadOrgs()
    } catch (e) {
      alert('Xatolik yuz berdi')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tashkilotni o\'chirishni xohlaysizmi?')) return
    try {
      await server.deleteOrganization(id)
      loadOrgs()
    } catch (e) {
      alert('O\'chirishda xatolik')
    }
  }

  const filtered = orgs.filter(o =>
    o.name?.toLowerCase().includes(search.toLowerCase()) ||
    o.owner_name?.toLowerCase().includes(search.toLowerCase()) ||
    o.phone?.includes(search)
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ijarachilar ro'yxati</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Yangi ijarachi
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Qidirish..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">Barcha statuslar</option>
          <option value="DEMO">Demo</option>
          <option value="ACTIVE">Faol</option>
          <option value="SUSPENDED">To'xtatilgan</option>
          <option value="EXPIRED">Muddati tugagan</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-10">Yuklanmoqda...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tashkilot</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Rahbar</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Telefon</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">O'quvchilar</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(org => (
                <tr key={org.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-800">{org.name}</div>
                    <div className="text-sm text-gray-500">{org.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{org.owner_name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{org.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <span className="font-semibold">{org.active_student_count}</span> / {org.user_count}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      org.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                      org.status === 'DEMO' ? 'bg-yellow-100 text-yellow-700' :
                      org.status === 'SUSPENDED' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {org.status}
                      {org.status === 'DEMO' && org.demo_days_remaining > 0 &&
                        ` (${org.demo_days_remaining} kun)`}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelect(org.id)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Batafsil"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(org.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Yangi ijarachi qo'shish</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <input
                placeholder="Tashkilot nomi"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
              <input
                placeholder="Subdomen (slug)"
                value={form.slug}
                onChange={e => setForm({...form, slug: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
              <input
                placeholder="Rahbar FIO"
                value={form.owner_name}
                onChange={e => setForm({...form, owner_name: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
              <input
                placeholder="Telefon"
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
              <input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Admin login"
                  value={form.admin_username}
                  onChange={e => setForm({...form, admin_username: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
                <input
                  placeholder="Admin parol"
                  type="password"
                  value={form.admin_password}
                  onChange={e => setForm({...form, admin_password: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Demo (kun)</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={form.demo_days}
                    onChange={e => setForm({...form, demo_days: parseInt(e.target.value)})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Abonent (so'm)</label>
                  <input
                    type="number"
                    value={form.student_subscription_amount}
                    onChange={e => setForm({...form, student_subscription_amount: parseInt(e.target.value)})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Platforma (%)</label>
                  <input
                    type="number"
                    value={form.platform_fee_percent}
                    onChange={e => setForm({...form, platform_fee_percent: parseFloat(e.target.value)})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="flex-1 border rounded-lg py-2 hover:bg-gray-50"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
                >
                  Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
