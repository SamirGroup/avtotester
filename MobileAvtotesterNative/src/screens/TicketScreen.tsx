import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import api from '../services/api'

interface Ticket {
  id: number
  name: string
}

export default function TicketScreen({ navigation }: any) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      const response = await api.getTickets()
      setTickets(response.data.data || [])
    } catch (error) {
      console.error('Error loading tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectTicket = (ticketId: number) => {
    navigation.navigate('Test' as never, { ticketId })
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    )
  }

  return (
    <FlatList
      data={tickets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.ticketCard}
          onPress={() => handleSelectTicket(item.id)}
        >
          <Text style={styles.ticketNumber}>{item.name}</Text>
          <Text style={styles.ticketDesc}>Bilet bo'yicha test</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.container}
      numColumns={2}
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
  ticketCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    margin: 8,
    flex: 1,
    elevation: 1,
    alignItems: 'center',
  },
  ticketNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 4,
  },
  ticketDesc: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
})
