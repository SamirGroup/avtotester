# AvtoTester.uz - Production Deploy Hujjati

## 🚀 Deploy Variantlari

### 1. Lokal Server (Development) - HOZIRGI HOLAT

Hozircha barcha tizim lokal kompyuteringizda ishlaydi:

```
Backend:  http://localhost:8000
Frontend: http://localhost:5173
Bot:      Python process
```

**Ishga tushirish:**
```bash
# Backend
cd BackendAutotestmax.uz
python manage.py runserver 0.0.0.0:8000

# Bot
cd BackendAutotestmax.uz/Bot
python main.py

# Frontend
cd MobileAvtotester.uz
npm run dev
```

**Telegram Botni lokal server bilan ishlatish:**
1. BotFather da Mini App URL sozlang: `http://localhost:5173`
2. Foydalanuvchi botni ochganda Mini App ishga tushadi
3. **E'tibor:** Faqat sizning kompyuteringizda ishlaydi, internet orqali kirib bo'lmaydi

---

### 2. Cloudflare Tunnel (Development - Internetga chiqish)

Agar botni internet orqali test qilmoqchi bo'lsangiz:

```bash
# Cloudflare tunnel o'rnatish
npm install -g cloudflared

# Tunnel ishga tushirish
cloudflared tunnel --url http://localhost:8000
```

Bu sizga vaqtinchalik HTTPS URL beradi (masalan: `https://abc123.trycloudflare.com`)

---

### 3. VPS Deploy (Production)

#### 3.1 Backend (Ubuntu 22.04)

```bash
# 1. Server sozlash
sudo apt update && sudo apt upgrade -y
sudo apt install python3.11 python3.11-venv python3-pip -y
sudo apt install nginx postgresql postgresql-contrib -y

# 2. Django loyiha yuklash
cd /var/www
git clone <your-repo> avtotester
cd avtotester/BackendAutotestmax.uz

# 3. Virtual environment
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn

# 4. Migrations
python manage.py migrate
python manage.py collectstatic --noinput

# 5. Gunicorn systemd service
sudo nano /etc/systemd/system/avtotester.service
```

**/etc/systemd/system/avtotester.service:**
```ini
[Unit]
Description=AvtoTester Backend
After=network.target

[Service]
Type=notify
User=www-data
Group=www-data
WorkingDirectory=/var/www/avtotester/BackendAutotestmax.uz
ExecStart=/var/www/avtotester/BackendAutotestmax.uz/venv/bin/gunicorn \
    --workers 4 \
    --bind 0.0.0.0:8000 \
    --timeout 120 \
    config.wsgi:application

Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
# 6. Service ishga tushirish
sudo systemctl daemon-reload
sudo systemctl enable avtotester
sudo systemctl start avtotester

# 7. Nginx konfiguratsiya
sudo nano /etc/nginx/sites-available/avtotester
```

**/etc/nginx/sites-available/avtotester:**
```nginx
server {
    listen 80;
    server_name api.avtotester.uz;

    location /static/ {
        alias /var/www/avtotester/BackendAutotestmax.uz/staticfiles/;
    }

    location /media/ {
        alias /var/www/avtotester/BackendAutotestmax.uz/media/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# 8. Nginx aktivlash
sudo ln -s /etc/nginx/sites-available/avtotester /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx

# 9. SSL sertifikat (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.avtotester.uz
```

#### 3.2 Frontend (Vercel/Netlify)

**Vercel orqali:**
```bash
# Vercel CLI o'rnatish
npm install -g vercel

# Frontend papkasi
cd MobileAvtotester.uz

# Deploy
vercel --prod
```

**Netlify orqali:**
```bash
# Build
npm run build

# Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

**Frontend .env.production:**
```env
VITE_BACKEND_URL=https://api.avtotester.uz/api
```

#### 3.3 Bot Deploy

```bash
# Botni PM2 orqali ishga tushirish
npm install -g pm2

cd /var/www/avtotester/BackendAutotestmax.uz/Bot
pm2 start main.py --name "avtotester-bot"
pm2 save
pm2 startup
```

---

### 4. Docker Deploy (Alternative)

#### Dockerfile (Backend):
```dockerfile
FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN pip install --upgrade pip

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput
RUN python manage.py migrate

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application"]
```

#### docker-compose.yml:
```yaml
version: '3.8'

services:
  backend:
    build: ./BackendAutotestmax.uz
    ports:
      - "8000:8000"
    environment:
      - DEBUG=False
      - SECRET_KEY=${SECRET_KEY}
    volumes:
      - static_volume:/app/staticfiles
      - media_volume:/app/media

  frontend:
    build: ./MobileAvtotester.uz
    ports:
      - "5173:5173"
    environment:
      - VITE_BACKEND_URL=http://localhost:8000/api

  bot:
    build: ./BackendAutotestmax.uz/Bot
    environment:
      - BOT_TOKEN=${BOT_TOKEN}

volumes:
  static_volume:
  media_volume:
```

---

## 🔐 Production Sozlamalar

### Backend .env (Production)
```env
SECRET_KEY=<kuchli random key oling>
DEBUG=False
ALLOWED_HOSTS=avtotester.uz,api.avtotester.uz,*.vercel.app

# Database (PostgreSQL recommended)
DATABASE_URL=postgresql://user:password@localhost:5432/avtotester

# CORS
CORS_ALLOW_ALL_ORIGINS=False
CORS_ALLOWED_ORIGINS=https://avtotester.uz,https://*.vercel.app

# CSRF
CSRF_TRUSTED_ORIGINS=https://avtotester.uz,https://api.avtotester.uz
```

### Frontend .env.production
```env
VITE_BACKEND_URL=https://api.avtotester.uz/api
```

### Bot .env (Production)
```env
BOT_TOKEN=<bot token>
ADMIN_IDS=<admin telegram ID'lari>
BACKEND_URL=https://api.avtotester.uz
MINI_APP_URL=https://avtotester.uz
```

---

## 📊 Monitoring

### Backend logs:
```bash
# Systemd logs
sudo journalctl -u avtotester -f

# Gunicorn logs
sudo tail -f /var/log/gunicorn/error.log
```

### Bot logs:
```bash
pm2 logs avtotester-bot
```

### Frontend logs:
Browser console (F12)

---

## 🔧 Troubleshooting

### Backend muammolari:
- **500 Internal Server Error:** Logs tekshiring (`journalctl -u avtotester`)
- **Database connection error:** PostgreSQL ishlayaptimi tekshiring
- **Permission denied:** `chown -R www-data:www-data /var/www/avtotester`

### Frontend muammolari:
- **CORS error:** Backend CORS sozlamalarini tekshiring
- **404 Not Found:** Build to'g'ri bajarildimi tekshiring

### Bot muammolari:
- **Bot ishlamayapti:** Token to'g'rimi tekshiring
- **Webhook error:** BotFather da webhook o'chirilgan bo'lsin

---

## ✅ Deploy Checklist

- [ ] Backend VPS ga yuklangan
- [ ] PostgreSQL o'rnatilgan
- [ ] Nginx sozlangan
- [ ] SSL sertifikat o'rnatilgan (Let's Encrypt)
- [ ] Frontend Vercel/Netlify ga deploy qilingan
- [ ] Bot PM2 orqali ishga tushirilgan
- [ ] Backend .env production sozlamalar
- [ ] Frontend .env.production sozlangan
- [ ] CORS sozlamalar
- [ ] Domain DNS sozlangan
- [ ] Monitoring sozlangan

---

**Hozirgi holat:** Lokal development mode ✅
**Keyingi qadam:** Cloudflare tunnel yoki VPS deploy
