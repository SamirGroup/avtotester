import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useAuth } from '../context/AuthContext'

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth()

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.full_name?.charAt(0) || user?.username?.charAt(0) || 'U'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.full_name || user?.username}</Text>
        <Text style={styles.username}>@{user?.username}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Obuna holati</Text>
          <Text style={[
            styles.infoValue,
            user?.is_expired ? styles.expired : styles.active
          ]}>
            {user?.is_expired ? 'Tugagan' : 'Aktiv'}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Qolgan kunlar</Text>
          <Text style={styles.infoValue}>{user?.days_remaining || 0}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Payment' as never)}
        >
          <Text style={styles.menuItemText}>Obuna Xarid Qilish</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('History' as never)}
        >
          <Text style={styles.menuItemText}>Test Tarixi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Settings' as never)}
        >
          <Text style={styles.menuItemText}>Sozlamalar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {}}
        >
          <Text style={styles.menuItemText}>Platforma Haqida</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.logoutButton]}
          onPress={logout}
        >
          <Text style={styles.logoutText}>Chiqish</Text>
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
    padding: 40,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  username: {
    fontSize: 16,
    color: '#E0E7FF',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  active: {
    color: '#059669',
  },
  expired: {
    color: '#DC2626',
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1F2937',
  },
  logoutButton: {
    backgroundColor: '#FEF2F2',
  },
  logoutText: {
    fontSize: 16,
    color: '#DC2626',
    fontWeight: '600',
  },
})
