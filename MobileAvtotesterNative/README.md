# AvtoTester.uz - React Native Mobile App

## 📱 Mobile App Strukturasi

```
MobileAvtotesterNative/
├── src/
│   ├── components/
│   │   ├── TestCard.tsx
│   │   ├── ResultCard.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Loading.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── TestScreen.tsx
│   │   ├── ResultScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── PaymentScreen.tsx
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── TabNavigator.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── notification.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   └── utils/
│       └── helpers.ts
├── App.tsx
├── package.json
└── tsconfig.json
```

## 🚀 Install

```bash
npx react-native init MobileAvtotester
cd MobileAvtotester
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install axios @react-native-async-storage/async-storage
npm install react-native-push-notification
```

## 📋 Asosiy Sahifalar

### HomeScreen.tsx
```typescript
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AvtoTester.uz</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Kirish</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10 },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 18 }
})
```

### TestScreen.tsx
```typescript
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function TestScreen({ route, navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  
  const handleAnswer = (answerId) => {
    setAnswers([...answers, answerId])
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      navigation.navigate('Result', { answers })
    }
  }
  
  return (
    <View style={styles.container}>
      <Text>Question {currentQuestion + 1}</Text>
      {/* Test logic */}
    </View>
  )
}
```

## 🔔 Push Notifications

```typescript
// services/notification.ts
import PushNotification from 'react-native-push-notification'

export function scheduleSubscriptionReminder(daysRemaining: number) {
  PushNotification.localNotificationSchedule({
    title: 'Obuna Muddati Tugayapti!',
    message: `Sizning obuna muddatingiz ${daysRemaining} kundan keyin tugaydi`,
    date: new Date(Date.now() + 86400000 * daysRemaining),
    channelName: 'subscription',
  })
}
```

## 📊 Native Features

✅ Offline mode (SQLite cache)  
✅ Push notifications  
✅ Biometric authentication  
✅ Dark mode support  
✅ Better performance  
✅ Native animations  
