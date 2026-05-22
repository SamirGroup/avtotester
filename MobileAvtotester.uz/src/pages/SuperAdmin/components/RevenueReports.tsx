import { useState, useEffect } from 'react'
import { DollarSign, Calendar, TrendingUp, AlertCircle } from 'lucide-react'
import server from '../../../utils/Backend'

export default function RevenueReports() {
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState('')

  useEffect(() => {
    loadPayments()
  }, [year, month])

  const loadPayments = async () => {
    setLoading(true)
    try {
      const data = await server.getTenantPayments(year, month)
      setPayments(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateReport = async () => {
    try {
      await server.generateMonthlyReport(year, month ? parseInt(month) : new Date().getMonth() + 1)
      loadPayments()
    } catch (e) {
      alert('Hisobot yaratishda xatolik')
    }
  }

  const totalPending = payments.filter(p => p.status === 'PENDING').reduce((s, p) => s + parseFloat(p.platform_fee), 0)
  const totalPaid = payments.filter(p => p.status === 'PAID').reduce((s, p) => s + parseFloat(p.paid_amount), 0)
  const totalOverdue = payments.filter(p => p.status === 'OVERDUE').reduce((s, p) => s + parseFloat(p.platform_fee), 0)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Oylik kirimlar hisoboti</h1>
        <button
          onClick={handleGenerateReport}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Calendar className="w-4 h-4" /> Hisobot yaratish
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={year}
          onChange={e => setYear(parseInt(e.target.value))}
          className="border rounded-lg px-4 py-2"
        >
          {[2024, 2025, 2026].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select
          value={month}
          onChange={e => setMonth(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">Barcha oylar</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}-oy</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-yellow-50 rounded-lg p-6">
          <AlertCircle className="w-8 h-8 text-yellow-600 mb-4" />
          <div className="text-3xl font-bold">{totalPending.toLocaleString()}</div>
          <div className="text-gray-600">Kutilmoqda (so'm)</div>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <DollarSign className="w-8 h-8 text-green-600 mb-4" />
          <div className="text-3xl font-bold">{totalPaid.toLocaleString()}</div>
          <div className="text-gray-600">To'langan (so'm)</div>
        </div>
        <div className="bg-red-50 rounded-lg p-6">
          <TrendingUp className="w-8 h-8 text-red-600 mb-4" />
          <div className="text-3xl font-bold">{totalOverdue.toLocaleString()}</div>
          <div className="text-gray-600">Muddati o'tgan (so'm)</div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Yuklanmoqda...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tashkilot</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Davr</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Yig'ilgan</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Platforma ulushi</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">To'langan</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{p.organization_name}</td>
                  <td className="px-4 py-3 text-sm">{p.period_month}/{p.period_year}</td>
                  <td className="px-4 py-3 text-sm">{parseFloat(p.total_collected).toLocaleString()} so'm</td>
                  <td className="px-4 py-3 text-sm font-semibold text-orange-600">
                    {parseFloat(p.platform_fee).toLocaleString()} so'm
                  </td>
                  <td className="px-4 py-3 text-sm">{parseFloat(p.paid_amount).toLocaleString()} so'm</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      p.status === 'PAID' ? 'bg-green-100 text-green-700' :
                      p.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {p.status}
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
