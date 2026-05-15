# 🚀 AvtoTester.uz - Tez Boshlash

## ✅ Tayyorlangan Narsalar

### Backend
- ✅ Django 5.2.7 + DRF 3.16.1
- ✅ 9 ta model (User, Theme, Ticket, Test, Variant, Result, TestSheet, UserSession, Data)
- ✅ 35+ API endpoint
- ✅ Custom UUID Token autentifikatsiya
- ✅ Telegram Bot (aiogram 3.7) - Token sozlandi: `8306874742:AAEhMFKCfniNI4XkpYR8IfJ4fHBiUsVwNv0`
- ✅ Migrations va superuser (`admin/admin123`)
- ✅ Sample data (3 ta test, 5 ta mavzu, 5 ta bilet)

### Frontend
- ✅ React 19 + TypeScript + Vite
- ✅ TailwindCSS
- ✅ API Client (ServerConnection)
- ✅ Routing
- ✅ 25 ta sahifa (Home, Login, Dashboard, Test yechish, Natija, Admin)

## 🎯 Ishga Tushirish

### 1. Backend

```bash
cd BackendAutotestmax.uz

# Dependencies (agar o'rnatilmagan bo'lsa)
pip install -r requirements.txt

# Backendni ishga tushirish
python manage.py runserver 0.0.0.0:8000
```

**URL:** http://localhost:8000
**Admin:** http://localhost:8000/admin/
**API Docs:** http://localhost:8000/

### 2. Telegram Bot

```bash
cd BackendAutotestmax.uz/Bot

# Dependencies
pip install -r requirements.txt

# Botni ishga tushirish
python main.py
```

Bot token `.env` faylga avtomatik qo'shilgan.

### 3. Frontend

```bash
cd MobileAvtotester.uz

# Dependencies
npm install

# Dev server
npm run dev
```

**URL:** http://localhost:5173

## 🎮 Test Qilish

### Backend Test (Postman yoki cURL)

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Themes
curl http://localhost:8000/api/themes/

# Tickets
curl http://localhost:8000/api/tickets/
```

### Frontend Test

1. http://localhost:5173 ga kiring
2. "Tizimga kirish" tugmasini bosing
3. Admin bilan kiring: `admin` / `admin123`
4. Dashboard sahifasidan testlarni boshlang

## 📊 Ma'lumotlar Bazasi

### Joriy Ma'lumotlar
- **Admin User:** admin / admin123
- **Themes:** 5 ta (I-V)
- **Tickets:** 5 ta (Bilet 1-5)
- **Tests:** 3 ta (sample)
- **Variants:** 12 ta (4 har bir test uchun)

### Ko'proq Test Qo'shish

```bash
cd BackendAutotestmax.uz
python manage.py shell
```

```python
from api.models import Theme, Test, Variant

theme = Theme.objects.get(name="I. Umumiy qoidalar")

test = Test.objects.create(
    value="Yangi savol matni",
    theme=theme,
    active=True
)

variants = ["Javob A", "Javob B", "Javob C", "Javob D"]
for i, text in enumerate(variants):
    v = Variant.objects.create(test=test, value=text)
    if i == 0:  # Birinchi javob to'g'ri
        test.correct_answer_id = v

test.save()
```

## 🔧 Sozlamalar

### Backend `.env`

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=*
```

### Bot `.env`

```env
BOT_TOKEN=8306874742:AAEhMFKCfniNI4XkpYR8IfJ4fHBiUsVwNv0
ADMIN_IDS=
BACKEND_URL=http://localhost:8000
MINI_APP_URL=http://localhost:5173
```

### Frontend `.env`

```env
VITE_BACKEND_URL=http://localhost:8000/api
```

## 🐛 Muammolarni Hal Qilish

### Backend muammolari

**Error: Module not found**
```bash
pip install -r requirements.txt
```

**Error: Migration xatoligi**
```bash
python manage.py makemigrations
python manage.py migrate
```

### Frontend muammolari

**Error: Cannot find module**
```bash
npm install
```

**Error: Port already in use**
```bash
npm run dev -- --port 5174
```

## 📱 Telegram Bot Sozlash

1. BotFather ga kiring (@BotFather)
2. `/newbot` buyrug'ini yuboring
3. Bot nomini va username kiriting
4. Token oling va `.env` faylga qo'shing

**Mavjud bot:** Token allaqachon sozlangan (`8306874742:...`)

## 🚀 Production Deploy

### Backend (VPS)

```bash
# PostgreSQL o'rnatish
sudo apt install postgresql postgresql-contrib

# Gunicorn o'rnatish
pip install gunicorn

# Nginx sozlash
sudo apt install nginx

# systemd service yaratish
sudo nano /etc/systemd/system/avtotester.service
```

### Frontend (Vercel/Netlify)

```bash
# Build
npm run build

# Deploy (Vercel)
vercel deploy --prod
```

## 📞 Yordam

Agar muammo bo'lsa:
1. README.md ni o'qing
2. Backend logs ni tekshiring
3. Browser console ni tekshiring

---

**Yaratuvchilar:** NLP-Core-Team
**Versiya:** 1.0.0
**Sana:** 2024
