import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { useAuth } from '../context/AuthContext'

interface LoginScreenProps {
  navigation: any
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Xatolik', 'Barcha maydonlarni to\'ldiring')
      return
    }

    setLoading(true)
    try {
      await login(username, password)
      Alert.alert('Muvaffaqiyatli', 'Tizimga kirdingiz')
    } catch (error: any) {
      Alert.alert(
        'Kirish muvaffaqiyatsiz',
        error.response?.data?.message || 'Noto\'g\'ri login yoki parol'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>AvtoTester.uz</Text>
          <Text style={styles.subtitle}>Tizimga kirish</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Login</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Login kiriting"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Parol</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Parol kiriting"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>Kirish</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => {}}
          >
            <Text style={styles.registerButtonText}>
              Ro'yxatdan o'tish
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoText}>
            Agar sizda obuna bo'lmasa, to'lov sahifasidan obuna xarid qiling.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
  },
  info: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#1E40AF',
    textAlign: 'center',
    lineHeight: 20,
  },
})
