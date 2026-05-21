# Lotus Blocks — Pazarlama Sitesi

Lotus Blocks oyununun resmi tanıtım sitesi. Statik HTML/CSS/JS — build adımı yok, GitHub Pages'e push-and-go.

## Özellikler

- 4 dil: **EN** (kök) · **TR** (`/tr/`) · **ES** (`/es/`) · **JA** (`/ja/`)
- Tek CSS dosyası (Komorebi-Bungu paleti), tek vanilla JS dosyası (~50 satır)
- Tarayıcı dili tespiti + `localStorage` ile dil tercihi hatırlama
- Tüm sayfalarda hreflang metası (Google SEO için)
- `.nojekyll` — Jekyll'in karışmasını engeller
- `ads.txt` — AdMob site doğrulama için (gerçek publisher ID ile güncellenmeli)
- Custom 404 (`404.html`) — GitHub Pages otomatik kullanır
- Mobil-uyumlu, `prefers-reduced-motion` saygılı, 11+ kontrast oranı

## Yerelde önizleme

```bash
cd website
python3 -m http.server 8000
# Aç: http://localhost:8000  (EN)
#     http://localhost:8000/tr/
#     http://localhost:8000/es/
#     http://localhost:8000/ja/
```

## GitHub Pages'e dağıtım

1. Yeni bir public GitHub repo oluştur (ör. `lotusblocks`).
2. Bu klasörün **içeriğini** repo köküne kopyala (websaite klasörünü değil — *içeriğini*).
   ```bash
   cd website
   git init
   git add .
   git commit -m "Initial commit: Lotus Blocks marketing site"
   git branch -M main
   git remote add origin git@github.com:<KULLANICI>/<REPO>.git
   git push -u origin main
   ```
3. GitHub'da **Settings → Pages**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / `(root)`
   - Save'e bas. Birkaç dakika içinde `https://<KULLANICI>.github.io/<REPO>/` yayında olur.
4. (Opsiyonel) **Özel domain:**
   - `CNAME` dosyasındaki `ekinuzunyayla.github.io/lotusblocks` satırını kendi domaininle değiştir.
   - DNS sağlayıcında `A` kayıtları (185.199.108–111.153) veya `CNAME` (`<kullanıcı>.github.io`) ekle.
   - Pages ayarlarında Custom Domain alanına domaini gir, "Enforce HTTPS" işaretle.

## Yayım öncesi yasal/teknik kontrol listesi (AdMob için)

- [ ] `ads.txt` içine gerçek AdMob publisher ID'sini ekle
- [ ] `privacy.html` ve `terms.html` (4 dil = 8 dosya) gerçek yasal metinle doldur
  - Şu anda `[PLACEHOLDER]` / `[YER TUTUCU]` / `[MARCADOR]` / `[プレースホルダー]` etiketleri var
- [ ] Footer'daki iletişim e-postasını gerekirse iş e-postanla değiştir (`Find & Replace` ile `ekinnuzunyayla@gmail.com`)
- [ ] `sitemap.xml`, `robots.txt`, `index.html` ve diğer HTML dosyalarındaki `ekinuzunyayla.github.io/lotusblocks` URL'sini gerçek domaininle değiştir
  - Yerleşim: 12+ dosyada `hreflang` ve OG meta'sında
- [ ] OG için 1200×630 `og-image.png` üret (opsiyonel — şu an logo kullanılıyor)
- [ ] AdMob başvurusundan önce siteyi mobilde test et (gerçek cihaz veya DevTools)

## Klasör yapısı

```
website/
├── index.html              EN ana sayfa
├── privacy.html · terms.html
├── 404.html
├── ads.txt · robots.txt · sitemap.xml
├── .nojekyll · CNAME
├── tr/  es/  ja/           Her biri index + privacy + terms
└── assets/
    ├── css/style.css       Komorebi-Bungu paleti, tek dosya
    ├── js/main.js          Vanilla, ~50 satır
    ├── fonts/              Nunito + Cormorant TTF
    └── img/                logo · hero · themes · wallpapers · avatars · skills
```

## Asset kaynağı

Tüm görseller `composeApp/src/commonMain/composeResources/drawable/`'dan kopyalandı. Oyun güncellendiğinde:
```bash
# (FlowBlast2 kök dizininden)
cp composeApp/src/commonMain/composeResources/drawable/cover_*.webp website/assets/img/themes/
cp composeApp/src/commonMain/composeResources/drawable/*_wall.webp website/assets/img/wallpapers/
cp composeApp/src/commonMain/composeResources/drawable/avatar_*.{webp,png} website/assets/img/avatars/
```

## Lisans

Site kodu — projeyle aynı lisansa tabi. Asset'ler (görseller, fontlar) Lotus Blocks markasının parçası, izinsiz kullanılamaz.
