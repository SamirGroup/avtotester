import { useState, useEffect } from 'react'
import { ArrowLeft, Users, DollarSign, FileText, TrendingUp, CheckCircle, XCircle } from 'lucide-react'
import server from '../../../utils/Backend'

interface Props {
  orgId: number
  onBack: () => void
}

export default function OrganizationDetail({ orgId, onBack }: Props) {
  const [org, setOrg] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [students, setStudents] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [showContract, setShowContract] = useState(false)
  const [contractForm, setContractForm] = useState({
    contract_number: '', start_date: '', end_date: '',
    monthly_fee: 0, platform_fee_percent: 20, terms: ''
  })

  useEffect(() => {
    loadData()
  }, [orgId])

  const loadData = async () => {
    setLoading(true)
    try {
      const [orgData, statsData, studentsData, paymentsData] = await Promise.all([
        server.getOrganizationDetail(orgId),
        server.getOrganizationStatistics(orgId),
        server.getOrganizationStudents(orgId),
        server.getOrganizationPayments(orgId)
      ])
      setOrg(orgData)
      setStats(statsData)
      setStudents(studentsData)
      setPayments(paymentsData)
      if (orgData.contract) {
        setContractForm({
          contract_number: orgData.contract.contract_number || '',
          start_date: orgData.contract.start_date || '',
          end_date: orgData.contract.end_date || '',
          monthly_fee: orgData.contract.monthly_fee || 0,
          platform_fee_percent: orgData.contract.platform_fee_percent || 20,
          terms: orgData.contract.terms || ''
        })
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateContract = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await server.createContract({
        organization_id: orgId,
        ...contractForm
      })
      setShowContract(false)
      loadData()
    } catch (e) {
      alert('Shartnoma yaratishda xatolik')
    }
  }

  const handleUpdateStatus = async (newStatus: string) => {
    try {
      await server.updateOrganization(orgId, { status: newStatus })
      loadData()
    } catch (e) {
      alert('Status yangilashda xatolik')
    }
  }

  if (loading) return <div className="p-6 text-center">Yuklanmoqda...</div>
  if (!org) return <div className="p-6">Ma'lumot topilmadi</div>

  return (
    <div className="p-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4">
        <ArrowLeft className="w-4 h-4" /> Orqaga
      </button>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{org.name}</h1>
            <p className="text-gray-500">{org.slug} | {org.owner_name} | {org.phone}</p>
          </div>
          <div className="flex gap-2">
            {org.status === 'DEMO' && (
              <button
                onClick={() => setShowContract(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <FileText className="w-4 h-4" /> Shartnoma tuzish
              </button>
            )}
            {org.status === 'SUSPENDED' ? (
              <button
                onClick={() => handleUpdateStatus('ACTIVE')}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <CheckCircle className="w-4 h-4" /> Faollashtirish
              </button>
            ) : (
              <button
                onClick={() => handleUpdateStatus('SUSPENDED')}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                <XCircle className="w-4 h-4" /> To'xtatish
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <Users className="w-6 h-6 text-blue-600 mb-2" />
            <div className="text-2xl font-bold">{stats?.total_students || 0}</div>
            <div className="text-sm text-gray-600">Jami o'quvchilar</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
            <div className="text-2xl font-bold">{stats?.active_students || 0}</div>
            <div className="text-sm text-gray-600">Faol o'quvchilar</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <DollarSign className="w-6 h-6 text-purple-600 mb-2" />
            <div className="text-2xl font-bold">{(stats?.total_payments || 0).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Jami to'lovlar</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <TrendingUp className="w-6 h-6 text-orange-600 mb-2" />
            <div className="text-2xl font-bold">{(stats?.total_platform_fees || 0).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Platforma ulushi</div>
          </div>
        </div>
      </div>

      {org.contract && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Shartnoma ma'lumotlari</h2>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Shartnoma raqami:</span>
              <span className="ml-2 font-semibold">{org.contract.contract_number}</span>
            </div>
            <div>
              <span className="text-gray-500">Boshlanish:</span>
              <span className="ml-2 font-semibold">{org.contract.start_date}</span>
            </div>
            <div>
              <span className="text-gray-500">Tugash:</span>
              <span className="ml-2 font-semibold">{org.contract.end_date}</span>
            </div>
            <div>
              <span className="text-gray-500">Oylik to'lov:</span>
              <span className="ml-2 font-semibold">{org.contract.monthly_fee?.toLocaleString()} so'm</span>
            </div>
            <div>
              <span className="text-gray-500">Platforma ulushi:</span>
              <span className="ml-2 font-semibold">{org.contract.platform_fee_percent}%</span>
            </div>
            <div>
              <span className="text-gray-500">Status:</span>
              <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                org.contract.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {org.contract.status}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          {[
            { id: 'overview', label: 'Umumiy' },
            { id: 'students', label: `O'quvchilar (${students.length})` },
            { id: 'payments', label: `To'lovlar (${payments.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4">
          {activeTab === 'overview' && stats && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Oylik dinamika</h3>
                <div className="h-48 flex items-end gap-4">
                  {stats.monthly_stats?.map((m: any, i: number) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="text-xs text-gray-500 mb-1">
                        {Math.round(m.platform_fee / 1000)}k
                      </div>
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${Math.max(20, (m.payments_amount / (stats.total_payments || 1)) * 150)}px` }}
                      />
                      <div className="text-xs text-gray-600 mt-1">{m.month_name?.slice(0, 3)}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500">Testlar soni</div>
                  <div className="text-xl font-bold">{stats.total_tests_taken}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500">Tugallangan testlar</div>
                  <div className="text-xl font-bold">{stats.finished_tests}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500">O'rtacha ball</div>
                  <div className="text-xl font-bold">{Math.round(stats.avg_score * 100) / 100}%</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500">Muddati tugagan o'quvchilar</div>
                  <div className="text-xl font-bold text-red-600">{stats.expired_students}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-sm">ID</th>
                  <th className="px-3 py-2 text-left text-sm">Foydalanuvchi</th>
                  <th className="px-3 py-2 text-left text-sm">Status</th>
                  <th className="px-3 py-2 text-left text-sm">Qolgan kun</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id} className="border-t">
                    <td className="px-3 py-2 text-sm">{s.id}</td>
                    <td className="px-3 py-2 text-sm">
                      <div className="font-medium">{s.full_name || s.username}</div>
                      <div className="text-gray-500">{s.username}</div>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        s.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {s.is_active ? 'Faol' : 'Nofaol'}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-sm">{s.days_remaining} kun</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'payments' && (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-sm">ID</th>
                  <th className="px-3 py-2 text-left text-sm">O'quvchi</th>
                  <th className="px-3 py-2 text-left text-sm">Summa</th>
                  <th className="px-3 py-2 text-left text-sm">Platforma ulushi</th>
                  <th className="px-3 py-2 text-left text-sm">Usul</th>
                  <th className="px-3 py-2 text-left text-sm">Sana</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id} className="border-t">
                    <td className="px-3 py-2 text-sm">{p.id}</td>
                    <td className="px-3 py-2 text-sm">{p.user}</td>
                    <td className="px-3 py-2 text-sm font-medium">{parseFloat(p.amount).toLocaleString()} so'm</td>
                    <td className="px-3 py-2 text-sm text-orange-600">{parseFloat(p.platform_fee).toLocaleString()} so'm</td>
                    <td className="px-3 py-2 text-sm">{p.payment_method}</td>
                    <td className="px-3 py-2 text-sm">{new Date(p.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showContract && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Shartnoma tuzish</h2>
            <form onSubmit={handleCreateContract} className="space-y-4">
              <input
                placeholder="Shartnoma raqami"
                value={contractForm.contract_number}
                onChange={e => setContractForm({...contractForm, contract_number: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Boshlanish sanasi</label>
                  <input
                    type="date"
                    value={contractForm.start_date}
                    onChange={e => setContractForm({...contractForm, start_date: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Tugash sanasi</label>
                  <input
                    type="date"
                    value={contractForm.end_date}
                    onChange={e => setContractForm({...contractForm, end_date: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Oylik to'lov (so'm)</label>
                  <input
                    type="number"
                    value={contractForm.monthly_fee}
                    onChange={e => setContractForm({...contractForm, monthly_fee: parseFloat(e.target.value)})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Platforma ulushi (%)</label>
                  <input
                    type="number"
                    value={contractForm.platform_fee_percent}
                    onChange={e => setContractForm({...contractForm, platform_fee_percent: parseFloat(e.target.value)})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              <textarea
                placeholder="Shartnoma shartlari"
                value={contractForm.terms}
                onChange={e => setContractForm({...contractForm, terms: e.target.value})}
                className="w-full border rounded-lg px-3 py-2 h-24"
              />
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowContract(false)}
                  className="flex-1 border rounded-lg py-2 hover:bg-gray-50"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white rounded-lg py-2 hover:bg-green-700"
                >
                  Shartnoma tuzish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
