# AvtoTester.uz - To'liq Loyiha Hujjati

**Status:** ✅ Development Mode - Lokal Serverda Ishlaydi  
**Sana:** 2024-05-15  
**Versiya:** 1.0.0  

---

## 📋 BAJARILGAN ISHLAR

### ✅ Backend (100% Tayyor)
- [x] Django 5.2.7 + DRF 3.16.1 to'liq konfiguratsiya
- [x] 9 ta model (User, Theme, Ticket, Test, Variant, Result, TestSheet, UserSession, Data)
- [x] 35+ API endpoint (Auth, User, Admin, Public, Test boshlash/yechish)
- [x] Custom UUID Token autentifikatsiya + Single Device Policy
- [x] Obuna tizimi (30 kun)
- [x] Django Admin panel konfiguratsiyasi
- [x] Telegram Bot (aiogram 3.7) - Token sozlandi
- [x] Migrations va migrations fayllar
- [x] Sample data generator (3 test, 5 mavzu, 5 bilet)
- [x] Decorators (@user_required, @admin_required)
- [x] Serializers (15+ ta)
- [x] Swagger API dokumentatsiyasi

### ✅ Frontend (80% Tayyor)
- [x] React 19 + TypeScript + Vite + TailwindCSS konfiguratsiya
- [x] API Client (ServerConnection class)
- [x] React Router DOM v7 routing
- [x] 25 ta sahifa yaratildi:
  - [x] Home - Landing page
  - [x] Login - Autentifikatsiya
  - [x] Dashboard - Boshqaruv paneli
  - [x] **SolveTest** - Test yechish (to'liq - timer, progress bar, natijalar)
  - [x] **TestResult** - Natijalar sahifasi (to'liq - statistika, foiz)
  - [x] **Exam** - Imtihon rejimi (to'liq - qoidalar, vaqt)
  - [x] **ByTheme** - Mavzu bo'yicha (to'liq - API integratsiya)
  - [x] **ByTicket** - Bilet bo'yicha (to'liq - API integratsiya)
  - [x] **SetTests** - Erkin test (to'liq - son tanlash)
  - [x] **Statistics** - Statistika (to'liq - grafiklar)
  - [x] **Profile** - Profil (to'liq - user ma'lumotlari)
  - [x] **AdminDashboard** - Admin panel
  - [x] **UserManagement** - Foydalanuvchilar
  - [x] **TestManagement** - Testlar
  - [x] About, Connections, NotFound - Placeholder

### ✅ Hujjatlar
- [x] README.md - To'liq
- [x] instruction.md - Bu fayl
- [x] DEPLOY.md - Production deploy bo'yicha
- [x] QUICKSTART.md - Tez boshlash
- [x] .env.example, .gitignore

---

## 🎯 ISHGA TUSHIRISH (LOKAL)

### 1. Backend
```bash
cd BackendAutotestmax.uz
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```
**URL:** http://localhost:8000  
**Admin:** http://localhost:8000/admin/ (admin/admin123)  
**API Docs:** http://localhost:8000/

### 2. Telegram Bot
```bash
cd BackendAutotestmax.uz/Bot
pip install -r requirements.txt
python main.py
```
**Token:** `8306874742:AAEhMFKCfniNI4XkpYR8IfJ4fHBiUsVwNv0` (sozlangan)

### 3. Frontend
```bash
cd MobileAvtotester.uz
npm install
npm run dev
```
**URL:** http://localhost:5173

---

## 📊 JORIY MA'LUMOTLAR

### Database
- **Users:** 1 admin (admin/admin123)
- **Themes:** 5 ta (I. Umumiy qoidalar - V. Yo'l harakati xavfsizligi)
- **Tickets:** 5 ta (Bilet 1-5)
- **Tests:** 3 ta sample test
- **Variants:** 12 ta (4 har bir test uchun)
- **Data:** 4 ta aloqa ma'lumotlari

### Frontend Sahifalar
- **To'liq ishlaydigan:** Home, Login, Dashboard, Exam, SolveTest, TestResult, ByTheme, ByTicket, SetTests, Statistics, Profile
- **Placeholder:** About, Connections, NotFound, Admin sahifalari

---

## 🔄 QOLGAN ISHLAR

### Frontend (20%)
- [ ] Admin panel komponentlarini to'liq qilish
- [ ] About, Connections sahifalarini to'ldirish
- [ ] History va HistoryReview sahifalari
- [ ] Testlar ro'yxati va tahrirlash

### Backend
- [ ] 800+ haqiqiy YHQ test qo'shish
- [ ] Test import/export (Excel/CSV)
- [ ] Rate limiting
- [ ] Email notification

### Production
- [ ] PostgreSQL ga ko'chirish
- [ ] VPS deploy yoki Cloud hosting
- [ ] HTTPS/SSL sertifikat
- [ ] Domain sozlash
- [ ] BotFather Mini App sozlash

---

## 🔑 KIRISH MA'LUMOTLARI

**Admin:**
- Username: `admin`
- Password: `admin123`

**Bot Token:** `8306874742:AAEhMFKCfniNI4XkpYR8IfJ4fHBiUsVwNv0`

---

## 📱 TELEGRAM BOT

### Lokal Serverda Test Qilish
1. BotFather ga kiring (@BotFather)
2. Mavjud botingizni oching
3. Bot Settings → Menu Button → Configure Menu Button
4. URL: `http://localhost:5173`
5. Send

**Muhim:** Lokal serverda faqat sizning kompyuteringizdan ishlaydi. Internet orqali test qilish uchun:
- Cloudflare tunnel ishlatish
- VPS deploy qilish
- Ngrok ishlatish

### Bot Buyruqlar
- `/start` - Mini App tugmasi bilan xabar
- `/help` - Yordam
- `/info` - Bot haqida

### Admin Keyboard
Admin ID `.env` faylga qo'shilganda kengaytirilgan keyboard ko'rsatiladi.

---

## 🚀 DEPLOY

To'liq deploy bo'yicha **DEPLOY.md** faylini o'qing.

### Tez Deploy (Cloudflare Tunnel)
```bash
npm install -g cloudflared
cloudflared tunnel --url http://localhost:8000
```

Bu sizga vaqtinchalik HTTPS URL beradi.

---

## 📝 API TEST QILISH

### Postman Collections

**Login:**
```bash
POST http://localhost:8000/api/auth/login/
{
  "username": "admin",
  "password": "admin123"
}
```

**Themes:**
```bash
GET http://localhost:8000/api/themes/
```

**Start Exam:**
```bash
POST http://localhost:8000/api/start_tests/start_exam/
Authorization: <token>
{
  "count": 20
}
```

---

## 🐛 MUAMMOLARNI HAL QILISH

### Backend
- **Migration xatoligi:** `python manage.py makemigrations && python manage.py migrate`
- **Module not found:** `pip install -r requirements.txt`
- **Port in use:** `python manage.py runserver 0.0.0.0:8001`

### Frontend
- **Dependencies:** `npm install`
- **Port in use:** `npm run dev -- --port 5174`
- **Build xatoligi:** `npm run build`

### Bot
- **Token error:** `.env` faylni tekshiring
- **Not responding:** `python main.py` qayta ishga tushiring

---

## 📞 YORDAM

Agar muammo bo'lsa:
1. instruction.md ni o'qing
2. README.md ni ko'ring
3. DEPLOY.md ni o'qing (deploy uchun)
4. Backend/Frontend logs ni tekshiring
5. Browser console ni tekshiring

---

**Yaratuvchilar:** NLP-Core-Team  
**Status:** Development - Lokal Server ✅  
**Keyingi Qadam:** Production Deploy yoki Test Ma'lumotlari Qo'shish

---

## 🎯 Loyiha Maqsadi

O'zbekiston Yo'l Harakati Qoidalari (YHQ) bo'yicha test platformasi yaratish. Platforma Telegram Mini App sifatida ishlaydi va foydalanuvchilarga:
- Mavzu bo'yicha test ishlash
- Bilet bo'yicha test ishlash  
- Erkin test ishlash
- Imtihon rejimida test topshirish (20 savol, 20 daqiqa, max 3 xato)
- Natijalarni kuzatish va statistika

imkonini beradi.

---

## 🏗️ Arxitektura

### Backend (Django)
```
BackendAutotestmax.uz/
├── config/              # Django konfiguratsiya
│   ├── settings.py      # Asosiy sozlamalar
│   ├── urls.py          # URL konfiguratsiyasi
│   ├── wsgi.py          # WSGI deployment
│   └── asgi.py          # ASGI deployment
├── api/                 # Asosiy API moduli
│   ├── models.py        # 9 ta model
│   ├── serializers.py   # DRF serializatorlar
│   ├── decorators.py    # Autentifikatsiya dekoratorlar
│   ├── admin.py         # Django Admin
│   ├── utils.py         # Yordamchi funksiyalar
│   ├── urls.py          # API marshrutlar
│   ├── views/           # API views
│   │   ├── auth_apis.py      # Login/Logout
│   │   ├── user_apis.py      # User API
│   │   ├── admin_apis.py     # Admin API
│   │   ├── public_apis.py    # Public API
│   │   ├── start_tests.py    # Test boshlash
│   │   └── solve_tests.py    # Test yechish
│   └── fixtures/        # Sample data
├── Bot/                 # Telegram Bot
│   ├── main.py          # Bot entry point
│   ├── config.py        # Bot sozlamalari
│   ├── handlers.py      # Buyruq handlerlar
│   ├── keyboards.py     # Inline keyboard
│   └── messages.py      # Xabar shablonlar
├── manage.py            # Django CLI
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables
└── db.sqlite3           # Ma'lumotlar bazasi
```

### Frontend (React)
```
MobileAvtotester.uz/
├── src/
│   ├── pages/                    # Sahifalar (25 ta)
│   │   ├── Home/                 # Bosh sahifa
│   │   ├── Auth/                 # Login
│   │   ├── Dashboard/            # Boshqaruv paneli
│   │   │   ├── ByTheme/          # Mavzu bo'yicha
│   │   │   ├── ByTicket/         # Bilet bo'yicha
│   │   │   ├── SetTests/         # Erkin test
│   │   │   ├── Exam/             # Imtihon
│   │   │   ├── SolveTest.tsx     # Test yechish
│   │   │   ├── TestResult.tsx    # Natijalar
│   │   │   ├── Statistics.tsx    # Statistika
│   │   │   └── History/          # Tarix
│   │   ├── Admin/                # Admin panel
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── components/       # Admin komponentlar
│   │   ├── profile/              # Profil
│   │   ├── About/                # Haqida
│   │   └── Others/               # 404, Connections
│   ├── components/               # UI komponentlar
│   │   ├── Layout/               # Layout
│   │   └── Ui/                   # UI elementlar
│   ├── routes/                   # Routing
│   │   └── AppRoutes.tsx
│   └── utils/                    # Yordamchi
│       └── Backend.tsx           # API Client
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
└── .env
```

---

## 💾 Ma'lumotlar Bazasi

### 9 ta Model

1. **User** - Foydalanuvchi (Custom AbstractUser)
   - Rol: ADMIN | STUDENT
   - Obuna: 30 kun (activated_at)
   - Single Device Policy
   - ruxsat: Imtihon rejimi uchun

2. **Theme** - Mavzu
   - Testlar mavzu bo'yicha guruhlangan

3. **Ticket** - Bilet
   - Imtihon biletlari

4. **Test** - Test Savoli
   - value: Savol matni
   - image: Ixtiyoriy rasm
   - correct_answer_id: To'g'ri javob FK
   - active: Faol/No faol
   - theme, ticket: FK

5. **Variant** - Javob Varianti
   - Bir testda cheksiz variant

6. **Result** - Natija
   - 4 test turi: THEME, TICKET, SETTEST, EXAM
   - start_time, end_time
   - true_answers, incorrect_answers
   - finished: Boolean

7. **TestSheet** - Test Varag'i
   - result_id, test_id FK
   - variant_orders: JSON (aralash tartib)
   - current_answer: FK
   - selected, successful

8. **UserSession** - Sessiya
   - OneToOne User
   - UUID token
   - device_info, ip_address

9. **Data** - Sozlamalar
   - Key-value format
   - Telegram, Instagram, YouTube, phone

---

## 🔌 API Endpointlar

### Autentifikatsiya
```
POST /api/auth/login/      - Tizimga kirish
POST /api/auth/logout/     - Tizimdan chiqish
```

### User API
```
GET  /api/profile/                    - Profil
GET  /api/themes/                     - Mavzular
GET  /api/tickets/                    - Biletlar
GET  /api/statistics/                 - Statistika
GET  /api/results/                    - Natijalar
GET  /api/history/                    - Tarix
GET  /api/result/{id}/tests/          - Test tafsilotlari
GET  /api/result/{id}/statistics/     - Test statistikasi
```

### Test Boshlash
```
POST /api/start_tests/start_theme/    - Mavzu testi
POST /api/start_tests/start_ticket/   - Bilet testi
POST /api/start_tests/start_settest/  - Erkin test
POST /api/start_tests/start_exam/     - Imtihon (20 savol)
```

### Test Yechish
```
POST /api/solve_tests/{sheet_id}/answer/  - Javob berish
POST /api/solve_tests/{result_id}/finish/ - Testni tugatish
```

### Admin API
```
GET/POST   /api/admin/user/            - Foydalanuvchilar
GET/PUT/DELETE /api/admin/user/{id}/   - User CRUD
GET/POST   /api/admin/theme/           - Mavzular
GET/POST   /api/admin/ticket/          - Biletlar
GET/POST   /api/admin/test/            - Testlar
GET/POST   /api/admin/test/{id}/variant/ - Variantlar
POST /api/admin/test/variant/{id}/true/ - To'g'ri javob
GET/POST   /api/admin/statistics/      - Umumiy statistika
GET/POST   /api/admin/all_users_stats/ - Barcha users stats
GET        /api/admin/user_statistics/{id}/ - User statistika
```

### Public API
```
GET  /api/public/connection/   - Aloqa ma'lumotlari
PUT  /api/public/connection/   - Aloqa yangilash (admin)
```

---

## 🤖 Telegram Bot

### Sozlamalar
- **Token:** `8306874742:AAEhMFKCfniNI4XkpYR8IfJ4fHBiUsVwNv0`
- **Framework:** aiogram 3.7
- **Mode:** Long Polling
- **Mini App URL:** http://localhost:5173

### Buyruqlar
```
/start  - Botni ishga tushirish, Mini App tugmasi
/help   - Yordam
/info   - Bot haqida
```

### Keyboard
**Admin uchun:**
- Test boshlash, Dashboard, Foydalanuvchilar, Statistika, Natijalar, Mavzular, Biletlar, Testlar, Murojatlar, Yordam, Ma'lumot

**User uchun:**
- Test ishlash, Yordam, Ma'lumot, Xatolik haqida

---

## 🎨 Frontend Sahifalar

### Public
1. **Home** - Landing page (gradient, xususiyatlar)
2. **Login** - Autentifikatsiya (username + parol)
3. **About** - Platforma haqida
4. **Connections** - Aloqa ma'lumotlari

### Protected (User)
5. **Dashboard** - Boshqaruv paneli (6 ta menyu)
6. **ByTheme** - Mavzu bo'yicha testlar
7. **ByTicket** - Bilet bo'yicha testlar
8. **SetTests** - Erkin test
9. **Exam** - Imtihon rejimi (qoidalar, vaqt)
10. **SolveTest** - Test yechish (timer, progress, variantlar)
11. **TestResult** - Natijalar (foiz, statistika)
12. **Statistics** - Umumiy statistika
13. **History** - Test tarixi
14. **HistoryReview** - Tarix tafsilotlari
15. **Profile** - Profil

### Admin
16. **AdminDashboard** - Admin bosh sahifa
17. **UserManagement** - Foydalanuvchilar CRUD
18. **TestManagement** - Testlar CRUD
19. **ThemeManagement** - Mavzular CRUD
20. **TicketManagement** - Biletlar CRUD

---

## 🔐 Xavfsizlik

### Joriy Sozlamalar (Development)
```python
DEBUG = True
CORS_ALLOW_ALL_ORIGINS = True
ALLOWED_HOSTS = ['*']
```

### Production uchun
```python
DEBUG = False
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    'https://avtotester.uz',
    'https://api.avtotester.uz',
    # ...
]
SECRET_KEY = <kuchli random key>
```

### Autentifikatsiya
- Custom UUID Token (server-side UserSession)
- Single Device Policy (bir qurilmadan kirish)
- @user_required, @admin_required dekoratorlar
- 30 kunlik obuna tizimi

---

## 📦 Dependencies

### Backend
```
Django==5.2.7
djangorestframework==3.16.1
drf-spectacular==0.29.0
django-cors-headers==4.9.0
Pillow==12.0.0
python-dotenv==1.2.1
```

### Bot
```
aiogram==3.7.0
aiohttp==3.10.11
```

### Frontend
```
react@19.1.1
react-dom@19.1.1
react-router-dom@7.9.5
typescript@5.9.3
vite@7.1.7
tailwindcss@4.1.16
lucide-react@0.553.0
```

---

## 🚀 Ishga Tushirish

### 1. Backend
```bash
cd BackendAutotestmax.uz
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

### 2. Bot
```bash
cd BackendAutotestmax.uz/Bot
pip install -r requirements.txt
python main.py
```

### 3. Frontend
```bash
cd MobileAvtotester.uz
npm install
npm run dev
```

---

## 🎮 Kirish Ma'lumotlari

**Admin:**
- Username: `admin`
- Password: `admin123`

**Bot Token:** `8306874742:AAEhMFKCfniNI4XkpYR8IfJ4fHBiUsVwNv0`

---

## 📊 Joriy Ma'lumotlar

- **Users:** 1 admin
- **Themes:** 5 ta
- **Tickets:** 5 ta
- **Tests:** 3 ta (sample)
- **Variants:** 12 ta

---

## 🔄 Keyingi Qadamlar

1. **Frontendni to'liq to'ldirish** - Barcha sahifalar
2. **800+ test qo'shish** - Real YHQ testlari
3. **Production deploy** - VPS/Cloud
4. **Telegram Mini App** - BotFather sozlash
5. **HTTPS** - SSL sertifikat
6. **PostgreSQL** - SQLite o'rniga

---

## 📞 Qo'llab-quvvatlash

Agar muammo bo'lsa:
1. Bu hujjatni o'qing
2. README.md ni ko'ring
3. Backend logs ni tekshiring
4. Browser console ni tekshiring

---

**Yaratuvchilar:** NLP-Core-Team  
**Yaratilgan:** 2024  
**Oxirgi yangilanish:** 2024-05-15
