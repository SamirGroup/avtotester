import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import api from '../services/api'

interface Theme {
  id: number
  name: string
}

export default function ThemeScreen({ navigation }: any) {
  const [themes, setThemes] = useState<Theme[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadThemes()
  }, [])

  const loadThemes = async () => {
    try {
      const response = await api.getThemes()
      setThemes(response.data.data || [])
    } catch (error) {
      console.error('Error loading themes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectTheme = (themeId: number) => {
    // Start theme test
    navigation.navigate('Test' as never, { themeId })
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
      data={themes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.themeCard}
          onPress={() => handleSelectTheme(item.id)}
        >
          <Text style={styles.themeName}>{item.name}</Text>
          <Text style={styles.themeDesc}>Mavzu bo'yicha testlar</Text>
        </TouchableOpacity>
      )}
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
  themeCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  themeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  themeDesc: {
    fontSize: 14,
    color: '#6B7280',
  },
})
