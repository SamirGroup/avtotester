import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function DashboardScreen({ navigation }: any) {
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    loadStatistics()
  }, [])

  const loadStatistics = async () => {
    try {
      setLoading(true)
      const response = await api.getStatistics()
      setStats(response.data.data)
    } catch (error) {
      console.error('Stats error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    Alert.alert(
      'Chiqish',
      'Haqiqatan ham chiqmoqchimisiz?',
      [
        { text: 'Bekor qilish', style: 'cancel' },
        { text: 'Chiqish', style: 'destructive', onPress: logout },
      ]
    )
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Assalomu alaykum,</Text>
          <Text style={styles.username}>{user?.full_name || user?.username}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Chiqish</Text>
        </TouchableOpacity>
      </View>

      {/* Subscription Status */}
      {user && (
        <View style={styles.subscriptionCard}>
          <Text style={styles.subscriptionTitle}>Obuna Holati</Text>
          <View style={styles.subscriptionStatus}>
            <Text style={styles.statusText}>
              {user.is_expired ? 'Obuna tugagan' : 'Aktiv'}
            </Text>
            <Text style={styles.daysRemaining}>
              Qolgan kunlar: {user.days_remaining}
            </Text>
          </View>
          {user.is_expired && (
            <TouchableOpacity
              style={styles.renewButton}
              onPress={() => navigation.navigate('Payment' as never)}
            >
              <Text style={styles.renewButtonText}>Obunani Yangilash</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tezkor Harakatlar</Text>
        
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Theme' as never)}
        >
          <Text style={styles.actionTitle}>Mavzu Bo'yicha</Text>
          <Text style={styles.actionDesc}>Biron bir mavzuni tanlab test yeching</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Ticket' as never)}
        >
          <Text style={styles.actionTitle}>Bilet Bo'yicha</Text>
          <Text style={styles.actionDesc}>Imtihon biletlari</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Test' as never)}
        >
          <Text style={styles.actionTitle}>Erkin Test</Text>
          <Text style={styles.actionDesc}>O'zingiz tanlagan sondagi test</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Test' as never)}
        >
          <Text style={styles.actionTitle}>Imtihon</Text>
          <Text style={styles.actionDesc}>Haqiqiy imtihon sharoiti</Text>
        </TouchableOpacity>
      </View>

      {/* Statistics */}
      {stats && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Umumiy Statistika</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.total_tests || 0}</Text>
              <Text style={styles.statLabel}>Yechilgan testlar</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.total_correct || 0}</Text>
              <Text style={styles.statLabel}>To'g'ri javoblar</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.total_results || 0}</Text>
              <Text style={styles.statLabel}>Testlar</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {stats.percentage ? `${Math.round(stats.percentage)}%` : '0%'}
              </Text>
              <Text style={styles.statLabel}>O'rtacha natija</Text>
            </View>
          </View>
        </View>
      )}

      {/* Recent Results */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>So'nggi Natijalar</Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('History' as never)}
        >
          <Text style={styles.viewAllText}>Barchasini ko'rish</Text>
        </TouchableOpacity>
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
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#E0E7FF',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  subscriptionCard: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    elevation: 2,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  subscriptionStatus: {
    marginBottom: 12,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  daysRemaining: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  renewButton: {
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  renewButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  actionDesc: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  viewAllButton: {
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewAllText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
})
