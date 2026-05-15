import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider, useAuth } from './src/context/AuthContext'
import AppNavigator from './src/navigation/AppNavigator'

function AppContent() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return null
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
      <AppNavigator isAuthenticated={isAuthenticated} />
    </>
  )
}

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
