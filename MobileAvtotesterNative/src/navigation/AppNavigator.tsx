import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { View, Text } from 'react-native'

// Screens
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import DashboardScreen from '../screens/DashboardScreen'
import TestScreen from '../screens/TestScreen'
import ResultScreen from '../screens/ResultScreen'
import ProfileScreen from '../screens/ProfileScreen'
import PaymentScreen from '../screens/PaymentScreen'
import ThemeScreen from '../screens/ThemeScreen'
import TicketScreen from '../screens/TicketScreen'
import HistoryScreen from '../screens/HistoryScreen'
import SettingsScreen from '../screens/SettingsScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function TabIcon({ name, label, focused }: { name: string; label: string; focused: boolean }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Ionicons name={focused ? name : `${name}-outline`} size={24} color={focused ? '#4F46E5' : '#6B7280'} />
      <Text style={{ fontSize: 10, color: focused ? '#4F46E5' : '#6B7280', marginTop: 2 }}>{label}</Text>
    </View>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const icons: Record<string, string> = {
            Home: 'home',
            Dashboard: 'grid',
            Test: 'document-text',
            History: 'history',
            Profile: 'person',
          }
          return <TabIcon name={icons[route.name] || 'help'} label={route.name} focused={focused} />
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Test" component={TestScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function AppNavigator({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4F46E5',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Kirish' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Kirish' }} />
          <Stack.Screen name="Theme" component={ThemeScreen} options={{ title: 'Mavzular' }} />
          <Stack.Screen name="Ticket" component={TicketScreen} options={{ title: 'Biletlar' }} />
          <Stack.Screen name="Test" component={TestScreen} options={{ title: 'Test' }} />
          <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Natija' }} />
          <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'To\'lov' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Sozlamalar' }} />
        </>
      )}
    </Stack.Navigator>
  )
}
