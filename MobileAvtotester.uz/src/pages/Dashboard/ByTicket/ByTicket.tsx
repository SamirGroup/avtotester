import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ticket as TicketIcon, ChevronRight } from 'lucide-react'
import server from '../../../utils/Backend'

interface Ticket {
  id: number
  name: string
  test_count: number
}

export default function ByTicket() {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      const data = await server.getTickets()
      setTickets(data)
    } catch (error) {
      console.error('Biletlar yuklash xatosi:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStart = (ticketId: number) => {
    server.startTicket(ticketId)
      .then(response => navigate(`/test/${response.data.result.id}`))
      .catch(error => alert(error.message || 'Testni boshlashda xatolik'))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <TicketIcon className="w-10 h-10 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Bilet bo'yicha testlar</h1>
            <p className="text-gray-600">Imtihon biletlari</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-600">Yuklanmoqda...</div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-12 text-gray-600">Biletlar topilmadi</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer" onClick={() => handleStart(ticket.id)}>
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-lg"><TicketIcon className="w-8 h-8 text-green-600" /></div>
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">{ticket.test_count} ta test</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{ticket.name}</h3>
                <div className="flex items-center gap-2 text-green-600 mt-4"><span className="font-semibold">Boshlash</span><ChevronRight className="w-5 h-5" /></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
