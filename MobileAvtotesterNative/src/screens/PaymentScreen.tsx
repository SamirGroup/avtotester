import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native'
import api from '../services/api'

export default function PaymentScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<'PAYME' | 'CLICK'>('PAYME')

  const handlePayment = async () => {
    setLoading(true)
    try {
      const response = await api.createPayment(100000, selectedMethod)
      const { payment_url } = response.data.data
      
      Alert.alert(
        'To\'lov',
        `To'lov URL: ${payment_url}\n\nBu URL ochiladi.`,
        [
          {
            text: 'Ochish',
            onPress: () => {
              // Linkni ochish (react-native-webview kerak)
              console.log('Open URL:', payment_url)
            }
          },
          { text: 'Bekor qilish', style: 'cancel' }
        ]
      )
    } catch (error: any) {
      Alert.alert('Xatolik', error.response?.data?.message || 'To\'lov yaratishda xatolik')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Obuna Xarid Qilish</Text>
        <Text style={styles.subtitle}>30 kunlik to'liq foydalanish</Text>
      </View>

      <View style={styles.pricingCard}>
        <Text style={styles.price}>100,000 UZS</Text>
        <Text style={styles.period}>1 oy (30 kun)</Text>
        
        <View style={styles.features}>
          <Text style={styles.feature}>✓ 4 xil test turi</Text>
          <Text style={styles.feature}>✓ 674+ test</Text>
          <Text style={styles.feature}>✓ Statistika va tarix</Text>
          <Text style={styles.feature}>✓ Telegram bot</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>To'lov Usulini Tanlang</Text>
        
        <TouchableOpacity
          style={[
            styles.methodButton,
            selectedMethod === 'PAYME' && styles.methodSelected
          ]}
          onPress={() => setSelectedMethod('PAYME')}
        >
          <Text style={[
            styles.methodText,
            selectedMethod === 'PAYME' && styles.methodTextSelected
          ]}>
            Payme
          </Text>
          <Text style={styles.methodDesc}>Mobil ilova orqali</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.methodButton,
            selectedMethod === 'CLICK' && styles.methodSelected
          ]}
          onPress={() => setSelectedMethod('CLICK')}
        >
          <Text style={[
            styles.methodText,
            selectedMethod === 'CLICK' && styles.methodTextSelected
          ]}>
            Click
          </Text>
          <Text style={styles.methodDesc}>Bank karta orqali</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.payButton, loading && styles.payButtonDisabled]}
        onPress={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.payButtonText}>100,000 UZS to'lov qilish</Text>
        )}
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Muhim ma'lumot:</Text>
        <Text style={styles.infoText}>
          • To'lov muvaffaqiyatli bo'lgandan keyin obuna avtomatik faollashadi
        </Text>
        <Text style={styles.infoText}>
          • 30 kun davomida cheksiz test ishlash imkoniyati
        </Text>
        <Text style={styles.infoText}>
          • Barcha funksiyalar ochiq bo'ladi
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#4F46E5',
    padding: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
  },
  pricingCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
  },
  price: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  period: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  features: {
    width: '100%',
  },
  feature: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  methodButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  methodSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF',
  },
  methodText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  methodTextSelected: {
    color: '#4F46E5',
  },
  methodDesc: {
    fontSize: 14,
    color: '#6B7280',
  },
  payButton: {
    margin: 20,
    padding: 16,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    margin: 20,
    padding: 16,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1E40AF',
    marginBottom: 4,
    lineHeight: 20,
  },
})
