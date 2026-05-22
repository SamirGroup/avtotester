import { useState, useEffect } from 'react'
import { FileText, Search, Download } from 'lucide-react'
import server from '../../../utils/Backend'

export default function ContractManagement() {
  const [contracts, setContracts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    loadContracts()
  }, [])

  const loadContracts = async () => {
    try {
      const data = await server.getContracts()
      setContracts(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const filtered = contracts.filter(c =>
    c.contract_number?.toLowerCase().includes(search.toLowerCase()) ||
    c.organization_name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shartnomalar boshqaruvi</h1>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Shartnoma yoki tashkilot bo'yicha qidirish..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
      </div>

      {loading ? (
        <div className="text-center py-10">Yuklanmoqda...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">#</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tashkilot</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Boshlanish</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tugash</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Oylik to'lov</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Platforma %</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{c.contract_number}</td>
                  <td className="px-4 py-3 text-sm">{c.organization_name}</td>
                  <td className="px-4 py-3 text-sm">{c.start_date}</td>
                  <td className="px-4 py-3 text-sm">{c.end_date}</td>
                  <td className="px-4 py-3 text-sm">{parseFloat(c.monthly_fee).toLocaleString()} so'm</td>
                  <td className="px-4 py-3 text-sm">{c.platform_fee_percent}%</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      c.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                      c.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
