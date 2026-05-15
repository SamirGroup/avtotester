import { useState } from 'react'
import { User, Mail, Calendar, Award, LogOut, Shield } from 'lucide-react'

interface ProfileProps {
  user: any
  onLogout: () => void
}

export default function Profile({ user, onLogout }: ProfileProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user?.full_name || user?.username}</h1>
                  <p className="opacity-90">@{user?.username}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
                <div className="flex-1">
                  <div className="text-sm text-gray-600">Rol</div>
                  <div className="font-semibold">{user?.role || 'STUDENT'}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
                <div className="flex-1">
                  <div className="text-sm text-gray-600">Obuna holati</div>
                  <div className="font-semibold text-green-600">Aktiv</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
                <div className="flex-1">
                  <div className="text-sm text-gray-600">Ro'yxatdan o'tgan</div>
                  <div className="font-semibold">{user?.date_joined ? new Date(user.date_joined).toLocaleDateString('uz-UZ') : '-'}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Mail className="w-6 h-6 text-orange-600" />
                <div className="flex-1">
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-semibold">{user?.email || 'Email yo\'q'}</div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  <LogOut className="w-5 h-5" />
                  Tizimdan chiqish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
