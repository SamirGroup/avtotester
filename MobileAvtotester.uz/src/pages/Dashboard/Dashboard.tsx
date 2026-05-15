import { Link } from 'react-router-dom'
import { BookOpen, Ticket, Shuffle, Trophy, BarChart3, History, User } from 'lucide-react'

export default function Dashboard() {
  const menuItems = [
    {
      to: '/themes',
      icon: BookOpen,
      title: 'Mavzu bo\'yicha',
      desc: 'Mavzular bo\'yicha testlar',
      color: 'bg-blue-500',
    },
    {
      to: '/tickets',
      icon: Ticket,
      title: 'Bilet bo\'yicha',
      desc: 'Imtihon biletlari',
      color: 'bg-green-500',
    },
    {
      to: '/settests',
      icon: Shuffle,
      title: 'Erkin test',
      desc: 'Tasodifiy testlar',
      color: 'bg-purple-500',
    },
    {
      to: '/exam',
      icon: Trophy,
      title: 'Imtihon',
      desc: '20 savol, 20 daqiqa',
      color: 'bg-red-500',
    },
    {
      to: '/statistics',
      icon: BarChart3,
      title: 'Statistika',
      desc: 'Natijalar tahlili',
      color: 'bg-yellow-500',
    },
    {
      to: '/history',
      icon: History,
      title: 'Tarix',
      desc: 'Testlar tarixi',
      color: 'bg-indigo-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Boshqaruv paneli</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
