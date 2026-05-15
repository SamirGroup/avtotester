# AvtoTester.uz Mobile App - O'rnatish Qo'llanmasi

## 📱 React Native Mobile App

---

## 1. Talablar

- Node.js 18+ (https://nodejs.org/)
- npm yoki yarn
- Android Studio (Android uchun)
- Xcode (iOS uchun - faqat macOS)
- Java Development Kit (JDK) 11+

---

## 2. O'rnatish

### 2.1 Dependencies o'rnatish

```bash
cd MobileAvtotesterNative
npm install
```

### 2.2 Android uchun o'rnatish

```bash
# Android SDK o'rnatilganligini tekshirish
cd android
./gradlew clean
cd ..

# Ilovanish ishga tushirish
npm run android
```

### 2.3 iOS uchun o'rnatish (faqat macOS)

```bash
cd ios
pod install
cd ..

npm run ios
```

### 2.4 Expo orqali (tezroq boshlash uchun)

```bash
# Expo CLI o'rnatish
npm install -g expo-cli

# Expo server ishga tushirish
npx expo start

# QR kod skanerlash orqali mobil telefonda ko'rish
```

---

## 3. Sozlamalar

### 3.1 API URL Sozlamasi

`src/services/api.ts` faylida `API_BASE_URL` ni o'zgartiring:

```typescript
const API_BASE_URL = 'https://api.avtotester.uz/api'
```

### 3.2 Payment Sozlamalari

To'lov uchun haqiqiy merchant ID larni `.env` faylga qo'shing:

```env
PAYME_MERCHANT_ID=your_merchant_id
CLICK_MERCHANT_ID=your_merchant_id
```

---

## 4. Ishga Tushirish

### Development Mode

```bash
npm run android
# yoki
npm run ios
# yoki
npm start
```

### Production Build

**Android:**
```bash
cd android
./gradlew assembleRelease
```

Build fayl: `android/app/build/outputs/apk/release/app-release.apk`

**iOS:**
```bash
cd ios
xcodebuild -workspace MobileAvtotesterUz.xcworkspace -scheme MobileAvtotesterUz -configuration Release -archivePath build/MobileAvtotesterUz.xcarchive archive
```

---

## 5. Features

### ✅ Amalga oshirilgan:
- [x] Autentifikatsiya (Login/Logout)
- [x] Dashboard (Boshqaruv paneli)
- [x] Test yechish (4 xil tur)
- [x] Natijalar ko'rish
- [x] Tarix
- [x] Profil
- [x] Payment (To'lov)
- [x] Settings (Sozlamalar)
- [x] Mavzular va Biletlar
- [x] Offline mode (AsyncStorage)
- [x] Push notifications (tayyor)
- [x] Biometric auth (tayyor)

### 🚧 Keyingi bosqich:
- [ ] Offline mode to'liq (SQLite)
- [ ] Dark mode
- [ ] Analytics
- [ ] Crash reporting

---

## 6. Troubleshooting

### Android qurilmada ishlamayapti:
```bash
# Metro bundlesh tozalash
npm start -- --reset-cache

# Build tozalash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS qurilmada ishlamayapti:
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

---

## 7. Debug

```bash
# React Native Debugger
npx react-native-debugger

# Loglar ko'rish
npx react-native log-android
# yoki
npx react-native log-ios
```

---

## 8. Test

```bash
npm test
```

---

## 9. Linting

```bash
npm run lint
npm run typecheck
```

---

## 10. Deploy

### Android Play Store:
1. Keystore yaratish
2. Release build olish
3. Google Play Console'da yuklash

### iOS App Store:
1. Apple Developer account kerak
2. Xcode'da archivelash
3. App Store Connect'da yuklash

---

**Versiya:** 1.0.0  
**Oxirgi yangilanish:** 2024-05-15
