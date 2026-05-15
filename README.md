# AvtoTester.uz - Haydovchilik Guvohnomasi Imtihoniga Tayyorgarlik Platformasi

[![Django](https://img.shields.io/badge/Django-5.2.7-green)](https://django.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://typescriptlang.org/)
[![aiogram](https://img.shields.io/badge/aiogram-3.7.0-blue)](https://aiogram.dev/)

**Status:** ✅ Development Mode - Lokal Serverda Ishlaydi

Telegram Mini App sifatida ishlaydigan, O'zbekiston Yo'l Harakati Qoidalari bo'yicha to'liq test platformasi.

---

## 🚀 Tez Boshlash

### Lokal Serverda Ishga Tushirish

**1. Backend:**
```bash
cd BackendAutotestmax.uz
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

**2. Telegram Bot:**
```bash
cd BackendAutotestmax.uz/Bot
pip install -r requirements.txt
python main.py
```

**3. Frontend:**
```bash
cd MobileAvtotester.uz
npm install
npm run dev
```

**URL'lar:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Admin Panel: http://localhost:8000/admin/
- API Docs: http://localhost:8000/

**Kirish:** `admin` / `admin123`

---

## 📁 Loyiha Tuzilishi

```
avtotester/
├── BackendAutotestmax.uz/       # 🐍 Django Backend
│   ├── config/                  # Django konfiguratsiya
│   ├── api/                     # API moduli (9 model, 35+ endpoint)
│   ├── Bot/                     # 🤖 Telegram Bot (aiogram 3.7)
│   ├── manage.py
│   └── requirements.txt
│
└── MobileAvtotester.uz/          # ⚛️ React Frontend
    ├── src/
    │   ├── pages/               # 25 ta sahifa
    │   ├── components/          # UI komponentlar
    │   ├── routes/              # Routing
    │   └── utils/               # API client
    ├── package.json
    └── vite.config.ts
```

---

## 🎯 Asosiy Funksiyalar

✅ **4 xil test rejimi:**
- Mavzu bo'yicha test (THEME)
- Bilet bo'yicha test (TICKET)
- Erkin test (SETTEST)
- Imtihon rejimi (EXAM) - 20 savol, 20 daqiqa, max 3 xato

✅ **Autentifikatsiya:**
- Custom UUID Token
- Single Device Policy
- 30 kunlik obuna tizimi

✅ **Admin Panel:**
- Foydalanuvchilar boshqaruvi
- Mavzular, Biletlar, Testlar CRUD
- Statistika va Natijalar

✅ **Telegram Bot:**
- Mini App integratsiyasi
- Admin va User uchun keyboard
- /start, /help, /info buyruqlar

---

## 📊 Hozirgi Holat

### Backend ✅ 100%
- 9 ta model
- 35+ API endpoint
- Custom autentifikatsiya
- Django Admin
- Telegram Bot
- Sample data (3 test, 5 mavzu, 5 bilet)

### Frontend ✅ 80%
- 25 ta sahifa
- 11 ta to'liq ishlaydigan sahifa
- API integratsiya
- TailwindCSS UI

### Qolgan IsHLar
- Admin panel to'liq qilish (20%)
- 800+ test qo'shish
- Production deploy

---

## 📚 Hujjatlar

- **[instruction.md](instruction.md)** - To'liq loyiha hujjati
- **[DEPLOY.md](DEPLOY.md)** - Production deploy bo'yicha
- **[QUICKSTART.md](QUICKSTART.md)** - Tez boshlash

---

## 🔧 Texnologiyalar

### Backend
- Django 5.2.7
- Django REST Framework 3.16.1
- aiogram 3.7.0
- SQLite3

### Frontend
- React 19.1.1
- TypeScript 5.9.3
- Vite 7.1.7
- TailwindCSS 4.1.16
- React Router DOM 7.9.5

---

## 🚀 Production Deploy

Production muhitga deploy qilish uchun **[DEPLOY.md](DEPLOY.md)** faylini o'qing.

**Variantlar:**
1. VPS (Ubuntu + Nginx + PostgreSQL)
2. Cloud (Vercel + Heroku/Railway)
3. Docker

---

## 📞 Aloqa

**Yaratuvchilar:** NLP-Core-Team
**Versiya:** 1.0.0  
**Sana:** 2024-05-15

---

## 📝 License

© 2024 AvtoTester.uz - Barcha huquqlar himoyalangan

## 🚀 Texnologik Stek

### Backend
- **Django 5.2.7** + **DRF 3.16.1**
- **SQLite3** (Production)
- **aiogram 3.7** (Telegram Bot)
- Custom UUID Token autentifikatsiya

### Frontend
- **React 19.1.1** + **TypeScript 5.9.3**
- **Vite 7.1.7** (Build tool)
- **TailwindCSS 4.1.16**
- **React Router DOM 7.9.5**

## 📁 Loyiha Tuzilishi

```
avtotester/
├── BackendAutotestmax.uz/       # 🐍 Django Backend
│   ├── config/                  # Django konfiguratsiya
│   ├── api/                     # API moduli
│   │   ├── models.py            # 9 ta model
│   │   ├── serializers.py       # DRF serializatorlar
│   │   ├── decorators.py        # Autentifikatsiya dekoratorlar
│   │   ├── admin.py             # Django Admin
│   │   ├── utils.py             # Yordamchi funksiyalar
│   │   ├── views/               # API views
│   │   │   ├── auth_apis.py
│   │   │   ├── user_apis.py
│   │   │   ├── admin_apis.py
│   │   │   ├── public_apis.py
│   │   │   ├── start_tests.py
│   │   │   └── solve_tests.py
│   │   └── urls.py
│   ├── Bot/                     # 🤖 Telegram Bot
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── handlers.py
│   │   ├── keyboards.py
│   │   └── messages.py
│   ├── manage.py
│   ├── requirements.txt
│   └── .env
│
└── MobileAvtotester.uz/          # ⚛️ React Frontend
    ├── src/
    │   ├── pages/               # 25 ta sahifa
    │   ├── components/          # UI komponentlar
    │   ├── routes/              # Routing
    │   └── utils/               # API client
    ├── package.json
    ├── vite.config.ts
    └── tsconfig.json
```

## 🔧 O'rnatish va Ishga Tushirish

### Backend

```bash
cd BackendAutotestmax.uz

# Virtual environment yaratish
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Dependencies o'rnatish
pip install -r requirements.txt

# Migrations
python manage.py makemigrations
python manage.py migrate

# Superuser yaratish
python manage.py createsuperuser

# .env faylni sozlash
cp .env.example .env
# .env ichiga SECRET_KEY va sozlamalarni qo'shing

# Backendni ishga tushirish
python manage.py runserver 0.0.0.0:8000
```

**Backend URL:** `http://localhost:8000`
**API Docs:** `http://localhost:8000/` (Swagger UI)
**Admin Panel:** `http://localhost:8000/admin/`

### Telegram Bot

```bash
cd BackendAutotestmax.uz/Bot

# Dependencies o'rnatish
pip install -r requirements.txt

# .env faylni sozlash
echo "BOT_TOKEN=your_bot_token_here" > .env
echo "ADMIN_IDS=123456789" >> .env

# Botni ishga tushirish
python main.py
```

### Frontend

```bash
cd MobileAvtotester.uz

# Dependencies o'rnatish
npm install

# .env faylni sozlash
cp .env.example .env

# Dev serverni ishga tushirish
npm run dev

# Production build
npm run build
```

**Frontend URL:** `http://localhost:5173`

## 🎯 Asosiy Funksiyalar

✅ **4 xil test rejimi:**
- Mavzu bo'yicha test (THEME)
- Bilet bo'yicha test (TICKET)
- Erkin test (SETTEST)
- Imtihon rejimi (EXAM) - 20 savol, 20 daqiqa, max 3 xato

✅ **Autentifikatsiya:**
- Custom UUID Token
- Single Device Policy (bir qurilmadan kirish)
- 30 kunlik obuna tizimi

✅ **Admin Panel:**
- Foydalanuvchilar boshqaruvi
- Mavzular, Biletlar, Testlar CRUD
- Statistika va Natijalar
- Aloqa ma'lumotlari

✅ **Telegram Bot:**
- Mini App integratsiyasi
- Admin va User uchun alohida keyboard
- /start, /help, /info buyruqlar

## 📊 API Endpointlar

### Autentifikatsiya
- `POST /api/auth/login/` - Tizimga kirish
- `POST /api/auth/logout/` - Tizimdan chiqish

### User API
- `GET /api/profile/` - Profil
- `GET /api/themes/` - Mavzular
- `GET /api/tickets/` - Biletlar
- `GET /api/statistics/` - Statistika
- `GET /api/results/` - Natijalar
- `GET /api/history/` - Tarix

### Test Boshlash
- `POST /api/start_tests/start_theme/` - Mavzu testi
- `POST /api/start_tests/start_ticket/` - Bilet testi
- `POST /api/start_tests/start_settest/` - Erkin test
- `POST /api/start_tests/start_exam/` - Imtihon

### Test Yechish
- `POST /api/solve_tests/{sheet_id}/answer/` - Javob berish
- `POST /api/solve_tests/{result_id}/finish/` - Testni tugatish

### Admin API
- `GET/POST /api/admin/user/` - Foydalanuvchilar
- `GET/PUT/DELETE /api/admin/user/{id}/` - User CRUD
- `GET/POST /api/admin/theme/` - Mavzular
- `GET/POST /api/admin/ticket/` - Biletlar
- `GET/POST /api/admin/test/` - Testlar
- `GET/POST /api/admin/test/{id}/variant/` - Variantlar

## 👤 Default Login

**Admin:**
- Username: `admin`
- Password: `admin123`

⚠️ **Production muhitda parolni o'zgartiring!**

## 🔐 Xavfsizlik

### Production uchun sozlamalar:
1. `CORS_ALLOW_ALL_ORIGINS = False` (faqat ishonchli domenlar)
2. `DEBUG = False`
3. Kuchli `SECRET_KEY` (`.env` da)
4. Bot token `.env` da saqlash
5. HTTPS majburiy
6. PostgreSQL ga ko'chirish (tavsiya)

## 📈 Kelajakdagi Rivojlantirish

- PostgreSQL migratsiya
- JWT Token tizimi
- Redis cache
- Rate limiting
- Payment gateway (Payme, Click)
- Push notification
- AI tavsiyalar
- Native mobile app

## 📝 License

© 2024 AvtoTester.uz - Barcha huquqlar himoyalangan

## 📞 Aloqa

- Telegram: @avtotester_uz
- Website: https://avtotester.uz

---

**Yaratuvchilar:** NLP-Core-Team
