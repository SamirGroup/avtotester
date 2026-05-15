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
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../services/api'

export default function ResultScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { resultId } = route.params as any

  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadResult()
  }, [])

  const loadResult = async () => {
    try {
      const response = await api.getResultTests(resultId)
      setResult(response.data.data)
    } catch (error) {
      Alert.alert('Xatolik', 'Natijani yuklashda xatolik')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    )
  }

  if (!result) {
    return (
      <View style={styles.centerContainer}>
        <Text>Natija topilmadi</Text>
      </View>
    )
  }

  const percentage = result.percentage || 0
  const isPassed = percentage >= 75

  return (
    <ScrollView style={styles.container}>
      {/* Result Header */}
      <View style={[styles.header, isPassed ? styles.passedHeader : styles.failedHeader]}>
        <Text style={styles.headerTitle}>
          {isPassed ? 'Tasdiqlandi!' : 'Muvaffaqiyatsiz'}
        </Text>
        <Text style={styles.headerPercentage}>
          {Math.round(percentage)}%
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{result.true_answers || 0}</Text>
          <Text style={styles.statLabel}>To'g'ri</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{result.incorrect_answers || 0}</Text>
          <Text style={styles.statLabel}>Noto'g'ri</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{result.test_length || 0}</Text>
          <Text style={styles.statLabel}>Jami</Text>
        </View>
      </View>

      {/* Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Test Tafsilotlari</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Test turi:</Text>
          <Text style={styles.detailValue}>{result.test_type || '-'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Sana:</Text>
          <Text style={styles.detailValue}>
            {new Date(result.start_time).toLocaleString('uz-UZ')}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Vaqt:</Text>
          <Text style={styles.detailValue}>
            {Math.ceil(((new Date(result.end_time || Date.now()).getTime() - 
                      new Date(result.start_time).getTime()) / 1000 / 60))} daqiqa
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => navigation.navigate('History' as never)}
        >
          <Text style={styles.reviewButtonText}>Tarixni ko'rish</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Main' as never)}
        >
          <Text style={styles.homeButtonText}>Bosh sahifaga</Text>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 40,
    alignItems: 'center',
  },
  passedHeader: {
    backgroundColor: '#059669',
  },
  failedHeader: {
    backgroundColor: '#DC2626',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerPercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: -20,
  },
  statBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    width: 100,
    elevation: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  actionsContainer: {
    padding: 20,
    gap: 12,
  },
  reviewButton: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  homeButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  homeButtonText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
  },
})
