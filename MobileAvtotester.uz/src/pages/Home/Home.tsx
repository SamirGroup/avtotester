import { Link } from 'react-router-dom'
import { Car, BookOpen, Trophy, Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-12">
          <Car className="w-24 h-24 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">AvtoTester.uz</h1>
          <p className="text-xl opacity-90">
            Haydovchilik guvohnomasi imtihoniga tayyorgarlik
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-lg">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Mavzular bo'yicha</h3>
            <p className="text-gray-600">Yo'l harakati qoidalari bo'yicha mavzular</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-lg">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Imtihon rejimi</h3>
            <p className="text-gray-600">Haqiqiy imtihon sharoiti</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-lg">
            <Shield className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-semibold mb-2">Statistika</h3>
            <p className="text-gray-600">Natijalarni kuzatish va tahlil</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Tizimga kirish
          </Link>
          <Link
            to="/about"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Haqida
          </Link>
        </div>
      </div>
    </div>
  )
}
