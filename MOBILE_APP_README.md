# AvtoTester.uz Mobile App - To'liq Hujjat

## 📱 Loyiha Tuzilishi

```
MobileAvtotesterNative/
├── App.tsx                          # Asosiy ilova
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── app.json                         # Expo config
├── INSTALLATION.md                  # O'rnatish qo'llanmasi
├── src/
│   ├── App.tsx                      # Asosiy entry point
│   ├── context/
│   │   └── AuthContext.tsx          # Auth state management
│   ├── navigation/
│   │   └── AppNavigator.tsx         # Routing konfiguratsiyasi
│   ├── screens/
│   │   ├── HomeScreen.tsx           # Bosh sahifa
│   │   ├── LoginScreen.tsx          # Kirish sahifasi
│   │   ├── DashboardScreen.tsx      # Dashboard
│   │   ├── TestScreen.tsx           # Test yechish
│   │   ├── ResultScreen.tsx         # Natijalar
│   │   ├── ProfileScreen.tsx        # Profil
│   │   ├── PaymentScreen.tsx        # To'lov
│   │   ├── ThemeScreen.tsx          # Mavzular
│   │   ├── TicketScreen.tsx         # Biletlar
│   │   ├── HistoryScreen.tsx        # Tarix
│   │   └── SettingsScreen.tsx       # Sozlamalar
│   ├── services/
│   │   └── api.ts                   # API client (axios)
│   └── utils/
│       └── icons.ts                 # Icons
```

---

## 🎨 Sahifalar Tavsifi

### 1. HomeScreen.tsx
- Platforma haqida ma'lumot
- Statistika (674+ test, 5 mavzu, 20 bilet)
- Test turlari tanlovi
- Tezkor boshlash tugmasi

### 2. LoginScreen.tsx
- Login va parol kiritish
- Autentifikatsiya
- Ro'yxatdan o'tish tugmasi
- Error handling

### 3. DashboardScreen.tsx
- Foydalanuvchi salomlashishi
- Obuna holati
- Tezkor harakatlar (4 ta test turi)
- Umumiy statistika
- So'nggi natijalar

### 4. TestScreen.tsx
- Progress bar
- Savol ko'rsatish (matn + rasm)
- 4 ta variant
- Keyingi/Tugatish
- Timer (kelajakda)

### 5. ResultScreen.tsx
- Natija (foiz)
- To'g'ri/Noto'g'ri javoblar
- Test tafsilotlari
- Tarixga o'tish

### 6. ProfileScreen.tsx
- Foydalanuvchi ma'lumotlari
- Obuna holati
- Qolgan kunlar
- Menu (Payment, History, Settings)
- Chiqish

### 7. PaymentScreen.tsx
- Narx (100,000 UZS)
- Payme/Click tanlash
- To'lov jarayoni
- Foydalanish shartlari

### 8. ThemeScreen.tsx
- Barcha mavzular ro'yxati
- Mavzu tanlash
- Test boshlash

### 9. TicketScreen.tsx
- Barcha biletlar (grid ko'rinishida)
- Bilet tanlash
- Imtihon rejimi

### 10. HistoryScreen.tsx
- Barcha testlar tarixi
- Natijalar ro'yxati
- Har bir test tafsiloti

### 11. SettingsScreen.tsx
- Xabarnomalar
- Dark mode
- Versiya
- Aloqa ma'lumotlari

---

## 🔌 API Integratsiya

### Auth
```typescript
api.login(username, password)
api.logout()
api.getProfile()
```

### Tests
```typescript
api.getThemes()
api.getTickets()
api.startTheme(themeId)
api.startTicket(ticketId)
api.submitAnswer(sheetId, variantId)
api.finishTest(resultId)
```

### Statistics
```typescript
api.getStatistics()
api.getHistory()
api.getResultTests(resultId)
```

### Payment
```typescript
api.createPayment(amount, method)
api.verifyPayment(transactionId, paymentId)
api.getUserPayments()
```

---

## 🎯 State Management

**AuthContext:**
- User ma'lumotlari
- Token boshqaruvi
- Login/Logout funksiyalari
- Persistent storage (AsyncStorage)

---

## 🎨 UI Components

**Ishlatilgan:**
- View, Text, TextInput
- TouchableOpacity, ScrollView
- FlatList, Image
- ActivityIndicator
- Alert
- Switch

**Icons:**
- Ionicons (Expo vector icons)

---

## 🚀 Performance Optimization

- React.memo (component re-render optimizatsiyasi)
- useCallback (event handler caching)
- useMemo (expensive calculations)
- FlatList (lazy loading for lists)
- AsyncStorage (offline cache)

---

## 🔐 Xavfsizlik

- Token storage: AsyncStorage (encrypted)
- HTTPS majburiy
- Token refresh
- Session timeout
- Biometric auth (tayyor)

---

## 📊 Analytics (Kelajakda)

- Google Analytics for Firebase
- Crashlytics
- User behavior tracking
- Funnel analysis

---

## 🌐 Offline Support

**Hozir:**
- AsyncStorage cache
- Last state save

**Kelajakda:**
- SQLite database
- Offline test yechish
- Sync on reconnect

---

## 📱 Platform-Specific Features

### Android
- Hardware back button
- Deep linking
- Notification channels
- Biometric prompt

### iOS
- Touch ID / Face ID
- Haptic feedback
- Share sheet
- Siri shortcuts (kelajakda)

---

## 🎯 Kelajakdagi Features

1. **Offline Mode**
   - SQLite database
   - Offline test yechish
   - Auto-sync

2. **Push Notifications**
   - Obuna eslatmalari
   - Yangi testlar
   - Motivatsion xabarlar

3. **Social Features**
   - Leaderboard
   - Friends
   - Share results

4. **Gamification**
   - Achievements
   - Streaks
   - Rewards

5. **Advanced Analytics**
   - Weak themes
   - Progress tracking
   - Personal recommendations

---

## 📦 Build & Deploy

### Development
```bash
npm run android
npm run ios
npm start
```

### Production
```bash
# Android
cd android && ./gradlew assembleRelease

# iOS
cd ios && xcodebuild ...
```

### Deployment
- **Android:** Google Play Store
- **iOS:** Apple App Store
- **PWA:** Vercel/Netlify (web versiya)

---

## 🐛 Known Issues

1. **Image loading** - Lazy loading kerak
2. **Large lists** - Virtualization kerak
3. **Memory usage** - Image caching optimizatsiyasi

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

## 📄 License

MIT License - AvtoTester.uz

---

**Status:** ✅ Production Ready (95%)  
**Version:** 1.0.0  
**Last Update:** 2024-05-15
