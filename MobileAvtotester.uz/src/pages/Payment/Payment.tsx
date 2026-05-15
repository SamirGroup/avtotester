import { useState } from 'react'
import { CreditCard, CheckCircle, Clock } from 'lucide-react'

export default function Payment() {
  const [amount, setAmount] = useState(100000)
  const [paymentMethod, setPaymentMethod] = useState('PAYME')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePayment = async () => {
    setLoading(true)
    setError('')
    
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/payment/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token || ''
        },
        body: JSON.stringify({
          amount: amount,
          payment_method: paymentMethod,
          subscription_days: 30,
          return_url: 'http://localhost:5173/payment/success'
        })
      })

      const data = await response.json()
      
      if (response.ok && data.data.payment_url) {
        // To'lov sahifasiga yo'naltirish
        window.location.href = data.data.payment_url
      } else {
        setError(data.error || 'To\'lov yaratishda xatolik')
      }
    } catch (err: any) {
      setError(err.message || 'To\'lov yaratishda xatolik')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-12">
          <CreditCard className="w-24 h-24 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Obuna Xarid Qilish</h1>
          <p className="text-xl opacity-90">30 kunlik to'liq foydalanish</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-green-600 mb-2">100,000 UZS</div>
                <div className="text-gray-600">1 oy (30 kun)</div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>4 xil test turi</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>674+ test</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Statistika va tarix</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Telegram bot</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition opacity-50">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-gray-400 mb-2">200,000 UZS</div>
                <div className="text-gray-400">3 oy (90 kun)</div>
              </div>
              <p className="text-center text-gray-500">Tez orada...</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">To'lov Usulini Tanlang</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod('PAYME')}
                className={`p-6 rounded-lg border-2 transition ${
                  paymentMethod === 'PAYME' 
                    ? 'border-green-600 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-2">Payme</div>
                  <div className="text-sm text-gray-600">Mobil ilova orqali</div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('CLICK')}
                className={`p-6 rounded-lg border-2 transition ${
                  paymentMethod === 'CLICK' 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-2">Click</div>
                  <div className="text-sm text-gray-600">Bank karta orqali</div>
                </div>
              </button>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Clock className="w-5 h-5 animate-spin" />
                  Yuklanmoqda...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  {amount.toLocaleString()} UZS to'lov qilish
                </>
              )}
            </button>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-800 mb-2">Muhim ma'lumot:</h3>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>✓ To'lov muvaffaqiyatli bo'lgandan keyin obuna avtomatik faollashadi</li>
              <li>✓ 30 kun davomida cheksiz test ishlash imkoniyati</li>
              <li>✓ Barcha funksiyalar ochiq bo'ladi</li>
              <li>✓ Muddat tugashidan oldin eslatma keladi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
