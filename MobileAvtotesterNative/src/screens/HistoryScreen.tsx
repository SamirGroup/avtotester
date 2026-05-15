import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import api from '../services/api'

interface Result {
  id: number
  test_type: string
  true_answers: number
  test_length: number
  start_time: string
  finished: boolean
}

export default function HistoryScreen({ navigation }: any) {
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadResults()
  }, [])

  const loadResults = async () => {
    try {
      const response = await api.getHistory()
      setResults(response.data.data || [])
    } catch (error) {
      console.error('Error loading results:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewResult = (resultId: number) => {
    navigation.navigate('Result' as never, { resultId })
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    )
  }

  if (results.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Hali testlar yo'q</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const percentage = (item.true_answers / item.test_length) * 100
        const isPassed = percentage >= 75

        return (
          <TouchableOpacity
            style={styles.resultCard}
            onPress={() => handleViewResult(item.id)}
          >
            <View style={styles.resultHeader}>
              <Text style={styles.resultType}>{item.test_type}</Text>
              <Text style={[
                styles.resultStatus,
                isPassed ? styles.passed : styles.failed
              ]}>
                {isPassed ? 'Tasdiqlandi' : 'Muvaffaqiyatsiz'}
              </Text>
            </View>
            <View style={styles.resultStats}>
              <Text style={styles.resultScore}>
                {item.true_answers}/{item.test_length}
              </Text>
              <Text style={styles.resultPercentage}>
                {Math.round(percentage)}%
              </Text>
            </View>
            <Text style={styles.resultDate}>
              {new Date(item.start_time).toLocaleDateString('uz-UZ')}
            </Text>
          </TouchableOpacity>
        )
      }}
      contentContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#6B7280',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  resultStatus: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  passed: {
    backgroundColor: '#D1FAE5',
    color: '#059669',
  },
  failed: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
  },
  resultStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },
  resultScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  resultPercentage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  resultDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
})
