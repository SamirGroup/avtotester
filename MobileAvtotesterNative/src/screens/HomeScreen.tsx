import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'

interface HomeScreenProps {
  navigation: any
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AvtoTester.uz</Text>
        <Text style={styles.subtitle}>O'zbekiston Yo'l Harakati Qoidalari</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>674</Text>
          <Text style={styles.statLabel}>Test Savollari</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Mavzular</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>20</Text>
          <Text style={styles.statLabel}>Biletlar</Text>
        </View>
      </View>

      {/* Test Types */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Turlari</Text>
        <TouchableOpacity
          style={styles.testTypeCard}
          onPress={() => navigation.navigate('Theme' as never)}
        >
          <Text style={styles.testTypeTitle}>Mavzu Bo'yicha</Text>
          <Text style={styles.testTypeDesc}>Bir mavzudagi barcha testlar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.testTypeCard}
          onPress={() => navigation.navigate('Ticket' as never)}
        >
          <Text style={styles.testTypeTitle}>Bilet Bo'yicha</Text>
          <Text style={styles.testTypeDesc}>Imtihon biletlari</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.testTypeCard}
          onPress={() => navigation.navigate('Test' as never)}
        >
          <Text style={styles.testTypeTitle}>Erkin Test</Text>
          <Text style={styles.testTypeDesc}>O'zingiz tanlagan sondagi test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.testTypeCard}
          onPress={() => navigation.navigate('Test' as never)}
        >
          <Text style={styles.testTypeTitle}>Imtihon</Text>
          <Text style={styles.testTypeDesc}>Haqiqiy imtihon sharoiti</Text>
        </TouchableOpacity>
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Dashboard' as never)}
      >
        <Text style={styles.startButtonText}>Boshlash</Text>
      </TouchableOpacity>

      {/* Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Platforma Haqida</Text>
        <Text style={styles.infoText}>
          Bu ilova sizga avtomobil haydovchisi guvohnomasini olishga yordam beradi.
          Barcha testlar O'zbekiston Yo'l Harakati Qoidalariga asoslangan.
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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: -20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: 100,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
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
  testTypeCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 1,
  },
  testTypeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  testTypeDesc: {
    fontSize: 14,
    color: '#6B7280',
  },
  startButton: {
    backgroundColor: '#4F46E5',
    margin: 20,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoSection: {
    padding: 20,
    paddingBottom: 40,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
})
