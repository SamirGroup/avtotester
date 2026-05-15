import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native'

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true)
  const [darkMode, setDarkMode] = React.useState(false)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Xabarnomalar</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Obuna eslatmalari</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
            thumbColor={notifications ? '#4F46E5' : '#F3F4F6'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ko'rinish</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Qora rejim</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
            thumbColor={darkMode ? '#4F46E5' : '#F3F4F6'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ma'lumot</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Versiya</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>
        
        <TouchableOpacity style={styles.infoRow}>
          <Text style={styles.infoLabel}>Platforma haqida</Text>
          <Text style={styles.infoValue}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.infoRow}>
          <Text style={styles.infoLabel}>Qoidalarni o'qish</Text>
          <Text style={styles.infoValue}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aloqa</Text>
        
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactText}>Telegram: @avtotester_uz</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactText}>Email: info@avtotester.uz</Text>
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
  section: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLabel: {
    fontSize: 16,
    color: '#374151',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLabel: {
    fontSize: 16,
    color: '#374151',
  },
  infoValue: {
    fontSize: 16,
    color: '#6B7280',
  },
  contactButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  contactText: {
    fontSize: 16,
    color: '#4F46E5',
  },
})
