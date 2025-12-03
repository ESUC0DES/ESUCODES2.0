# 🚀 ESUCODES - Explore Software Universe

Siber güvenlik ve yazılım odaklı, **Galactic/Sci-Fi** temalı ultra modern web platformu.

Bu README, **öğrenciler ve yeni başlayanlar** düşünülerek hazırlandı.  
Kod bilgin az olsa bile, adım adım takip ederek projeyi **bilgisayarına kurabilir, çalıştırabilir ve yapısını anlayabilirsin.**

## 📋 İçindekiler

- [Bu Proje Nedir? Kimin İçin?](#-bu-proje-nedir-kimin-için)
- [Özellikler](#-özellikler)
- [Teknoloji Yığını](#-teknoloji-yığını)
- [Yeni Başlayanlar İçin Hızlı Rehber](#-yeni-başlayanlar-i̇çin-hızlı-rehber)
- [Kurulum](#-kurulum)
- [Yapılandırma](#-yapılandırma)
- [WordPress API Bağlantısı](#-wordpress-api-bağlantısı)
- [Geliştirme](#-geliştirme)
- [Proje Yapısı](#-proje-yapısı)
- [Easter Eggs](#-easter-eggs)

## ❓ Bu Proje Nedir? Kimin İçin?

- **Amaç**: ESUCODES, siber güvenlik ve yazılım dünyasını, uzay/galaksi temalı modern bir arayüzle tanıtan bir web platformudur.
- **Kullanıcılar**: Öğrenciler, yazılım/siber güvenlik öğrenmek isteyenler, topluluk üyeleri ve eğitmenler.
- **Teknik hedef**: Next.js, TypeScript, Tailwind gibi modern teknolojileri kullanarak hem şık hem de performanslı bir site sunmak.

Bu projeyi:
- Portföyüne ekleyebilir,
- Tasarım ve frontend mimarisi öğrenmek için inceleyebilir,
- Kendi kulüp/topluluk siteni yapmak için şablon olarak kullanabilirsin.

## ✨ Özellikler

- 🌌 **Galactic/Sci-Fi Tema**: Futuristik, neon efektli, glassmorphism tasarım
- 📱 **Responsive Design**: Tüm cihazlarda mükemmel görünüm
- 🎨 **Modern Animasyonlar**: Framer Motion ile yumuşak geçişler
- 🔒 **Siber Güvenlik Odaklı**: Güvenlik best practices
- 📝 **Headless WordPress**: WordPress API entegrasyonu
- 🎮 **Easter Eggs**: Konami Code, Console mesajları, Glitch efektleri
- ⚡ **Performans**: Next.js 14 App Router ile optimize edilmiş

## 🛠 Teknoloji Yığını

- **Framework**: Next.js 14+ (App Router)
- **Dil**: TypeScript (Strict Mode)
- **Stil**: TailwindCSS
- **Animasyon**: Framer Motion
- **İkonlar**: Lucide React
- **Grafikler**: Recharts
- **CMS**: Headless WordPress

## 🧭 Yeni Başlayanlar İçin Hızlı Rehber

Kodla yeni tanışıyorsan, aşağıdaki adımlar sana yol gösterecek:

1. **Node.js Nedir?**  
   JavaScript kodunu bilgisayarında çalıştırmanı sağlayan altyapıdır. Bu projeyi çalıştırmak için gerekli.
2. **Kodu Nasıl Açacağım?**  
   - `esucodes2.0` klasörünü bilgisayarına indir/klonla.  
   - Sonra bu klasörü VS Code gibi bir editörle aç.
3. **Terminal Nedir?**  
   Komut yazarak bilgisayarına “talimat” verdiğin pencere.  
   VS Code’da aşağıdaki kısayol ile açabilirsin:
   - Windows: `Ctrl + ö` (veya `Ctrl + Shift + \``)
4. **Projeyi Çalıştırma Mantığı**  
   - Önce bağımlılıkları indiriyoruz: `npm install`  
   - Sonra geliştirme sunucusunu açıyoruz: `npm run dev`  
   - Son olarak tarayıcıdan: `http://localhost:3000` adresine gidiyoruz.

Takıldığın noktada her adımı yavaşça tekrar okuyup aynısını yaptığından emin ol.

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+ (resmi siteden indirilebilir)
- npm (Node ile birlikte gelir) veya yarn
- (İsteğe bağlı) WordPress kurulumu – blog yazılarını WordPress’ten çekmek istiyorsan gerekir

### Adımlar

1. **Projeyi klonlayın veya indirin**

```bash
cd esucodes2.0
```

2. **Bağımlılıkları yükleyin**

```bash
npm install
```

veya

```bash
yarn install
```

3. **Environment değişkenlerini ayarlayın**

Bu proje bazı gizli ayarları (URL, şifre vb.) `.env` dosyasında tutar.

- Proje klasörünün kökünde (yani `package.json` ile aynı yerde) **yeni bir dosya** oluşturun:
  - Dosya adı: `.env`
- Aşağıdaki örneği kopyalayıp kendi bilgilere göre düzenleyin (aşağıda detaylı açıklaması var):

```env
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:8080/wp-json/wp/v2
NEXT_PUBLIC_WORDPRESS_AUTH_USER=your_username
NEXT_PUBLIC_WORDPRESS_AUTH_PASS=your_application_password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=ESUCODES
ADMIN_SECRET_KEY=your_secret_key_here
```

4. **Geliştirme sunucusunu başlatın**

```bash
npm run dev
```

veya

```bash
yarn dev
```

5. **Tarayıcıda açın**

```
http://localhost:3000
```

## ⚙️ Yapılandırma

### Environment Değişkenleri

`.env` dosyanızı aşağıdaki şekilde yapılandırın.  
Her satır bir **anahtar = değer** çiftidir:

```env
# WordPress API Configuration
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:8080/wp-json/wp/v2
NEXT_PUBLIC_WORDPRESS_AUTH_USER=your_username
NEXT_PUBLIC_WORDPRESS_AUTH_PASS=your_application_password

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=ESUCODES

# Admin Configuration
ADMIN_SECRET_KEY=your_secret_key_here
```

### Production Yapılandırması

Projeyi gerçek sunucuya (production) alırken farklı adresler kullanmak isterseniz, `.env.production` dosyası oluşturabilirsiniz:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-domain.com/wp-json/wp/v2
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🔗 WordPress API Bağlantısı

Bu bölüm, blog içeriklerini WordPress üzerinden çekmek isteyenler içindir.  
Eğer WordPress kullanmak istemiyorsan, bu kısmı şimdilik atlayabilirsin.

### 1. WordPress Kurulumu

- Bir WordPress sitesi kurun veya var olan sitenizi kullanın.
- Siteniz çalışır durumda ve erişilebilir olmalı.

### 2. Application Password Oluşturma

1. WordPress admin paneline giriş yapın
2. **Kullanıcılar > Profiliniz** sayfasına gidin
3. Sayfanın altında **"Application Passwords"** bölümünü bulun
4. Yeni bir application password oluşturun
5. Oluşturulan şifreyi `.env` dosyasındaki `NEXT_PUBLIC_WORDPRESS_AUTH_PASS` değişkenine ekleyin

### 3. REST API Testi

WordPress REST API'nizin çalıştığını test edin:

```bash
curl http://localhost:8080/wp-json/wp/v2/posts
```

### 4. API Entegrasyonu

Projede WordPress API'den veri çekmek için hazır bir yardımcı dosya bulunur: `lib/wordpress.ts`.  
Bu dosya üzerinden postları, belirli kategorileri vb. çekebilirsiniz.

## 💻 Geliştirme

### Komutlar

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Production sunucusu
npm start

# Linting
npm run lint
```

### Kod Yapısı

- **Modüler Tasarım**: Her bileşen kendi dosyasında
- **DRY Prensibi**: Tekrarlayan kod yok
- **TypeScript**: Tip güvenliği için strict mode
- **Component-based**: Yeniden kullanılabilir bileşenler

## 📂 Proje Yapısı

Aşağıda klasör ve dosyaların **ne işe yaradığını** kısaca görebilirsin:

```
esucodes2.0/
├── app/                    # Next.js App Router (sayfalar burada)
│   ├── layout.tsx         # Tüm sayfalar için ortak tasarım (layout)
│   ├── page.tsx           # Anasayfa
│   ├── blog/              # Blog sayfaları
│   ├── team/              # Ekip sayfaları
│   ├── admin/             # Admin paneli
│   └── ...
├── components/            # Tekrar kullanılabilir React bileşenleri
│   ├── layout/           # Header, Footer gibi genel bileşenler
│   ├── home/             # Anasayfa bileşenleri
│   ├── blog/             # Blog bileşenleri
│   ├── team/             # Ekip bileşenleri
│   ├── admin/            # Admin bileşenleri
│   ├── errors/           # Hata sayfaları
│   └── easter-eggs/      # Eğlenceli gizli özellikler
├── lib/                  # Yardımcı fonksiyonlar (WordPress vb.)
├── public/               # Statik dosyalar (resimler, ikonlar)
├── app/globals.css       # Global stil dosyası
└── ...
```

## 🎮 Easter Eggs

### 1. Konami Code
`↑ ↑ ↓ ↓ ← → ← → B A` tuş kombinasyonunu yapınca gizli `/wormhole` sayfasına yönlendirilirsiniz.

### 2. Console Mesajı
F12 ile konsolu açtığınızda işe alım mesajı görürsünüz.

### 3. Logo Rage Click
Header'daki logoya 5 kere hızlıca tıklayınca roket gibi yukarı uçar.

### 4. Footer "Earth" Hover
Footer'daki "Made on Earth" yazısının üzerine gelince "Mars" olarak değişir.

### 5. Glitch Effect
Ekip sayfasındaki "Siber Güvenlik" kartlarında hover efekti.

### 6. Hacker Selection
Metin seçildiğinde neon mor arka plan, neon cyan yazı rengi.

## 🎨 Tasarım Sistemi

### Renk Paleti

- **Backgrounds**: `bg-primary` (#0f172a), `bg-secondary` (#1e293b)
- **Text**: `text-primary` (#f1f5f9), `text-secondary` (#cbd5e1)
- **Accents**: `accent-primary` (#818cf8), `accent-tertiary` (#22d3ee)

Detaylar için `tailwind.config.ts` dosyasına bakın.

## 🚢 Deployment

### Vercel (Önerilen)

1. GitHub'a push edin
2. [Vercel](https://vercel.com) hesabınıza giriş yapın
3. Yeni proje oluşturun
4. GitHub repository'nizi seçin
5. Environment değişkenlerini ekleyin
6. Deploy edin

### Netlify

1. GitHub'a push edin
2. [Netlify](https://netlify.com) hesabınıza giriş yapın
3. Yeni site oluşturun
4. Build komutu: `npm run build`
5. Publish directory: `.next`
6. Environment değişkenlerini ekleyin

## 📝 Notlar

- WordPress API bağlantısı için CORS ayarlarını kontrol edin
- Production'da HTTPS kullanın
- Environment değişkenlerini asla commit etmeyin
- `.env.local` dosyasını `.gitignore`'a ekleyin

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje özel bir projedir.

## 👨‍💻 Geliştirici

ESUCODES Team - Explore Software Universe

---

**Made on Earth** (Hover: **Made on Mars** 🚀)

