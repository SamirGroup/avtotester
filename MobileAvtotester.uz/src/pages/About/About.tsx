import { BookOpen, Award, Target, TrendingUp } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-12">
          <BookOpen className="w-24 h-24 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">AvtoTester.uz Haqida</h1>
          <p className="text-xl opacity-90">Haydovchilik guvohnomasi imtihoniga tayyorgarlik platformasi</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Bizning Maqsad</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              AvtoTester.uz - bu O'zbekiston Yo'l Harakati Qoidalari bo'yicha to'liq test platformasi. 
              Bizning maqsadimiz - kelajak haydovchilarga imtihonga samarali tayyorlanishga yordam berish, 
              yo'l xavfsizligini oshirish va professional haydovchilar yetishtirishdir.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-lg"><Award className="w-8 h-8 text-blue-600" /></div>
                <h3 className="text-xl font-bold text-gray-800">674+ Test</h3>
              </div>
              <p className="text-gray-600">Yo'l harakati qoidalari bo'yicha to'liq test bazasi</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 p-3 rounded-lg"><Target className="w-8 h-8 text-green-600" /></div>
                <h3 className="text-xl font-bold text-gray-800">4 Test Turi</h3>
              </div>
              <p className="text-gray-600">Mavzu, bilet, erkin test va imtihon rejimi</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-100 p-3 rounded-lg"><TrendingUp className="w-8 h-8 text-purple-600" /></div>
                <h3 className="text-xl font-bold text-gray-800">Statistika</h3>
              </div>
              <p className="text-gray-600">Natijalarni kuzatish va tahlil qilish</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-100 p-3 rounded-lg"><BookOpen className="w-8 h-8 text-red-600" /></div>
                <h3 className="text-xl font-bold text-gray-800">20+ Bilet</h3>
              </div>
              <p className="text-gray-600">Haqiqiy imtihon biletlari</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Texnologiyalar</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg"><div className="text-2xl font-bold text-blue-600 mb-2">Django</div><div className="text-gray-600">Backend</div></div>
              <div className="text-center p-4 bg-gray-50 rounded-lg"><div className="text-2xl font-bold text-cyan-600 mb-2">React</div><div className="text-gray-600">Frontend</div></div>
              <div className="text-center p-4 bg-gray-50 rounded-lg"><div className="text-2xl font-bold text-purple-600 mb-2">aiogram</div><div className="text-gray-600">Telegram Bot</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
