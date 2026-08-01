# Selfinity — Tanıtım ve Yasal Sayfalar Sitesi

[Selfinity](https://getselfinity.com) uygulamasının resmi sitesi: tanıtım sayfaları + uygulamanın mağaza incelemesinde ve uygulama içinde kullandığı gizlilik politikası ile kullanım koşulları.

Saf statik HTML/CSS/JS. **Build adımı yok**, bağımlılık yok, `npm install` yok — GitHub Pages'e push-and-go.

---

## ⚠️ Önce bunu okuyun: yasal sayfaların dosya adları SABİT

Uygulama bu altı URL'yi **koda gömülü** olarak taşıyor — `shared/src/commonMain/kotlin/com/mindoria/selfinity/core/PrivacyPolicy.kt`. Kayıt onayı ekranı, Ayarlar ve paywall altbilgisi bunları açar.

```
privacy-policy.html        privacy-policy-en.html        privacy-policy-es.html
terms-of-use.html          terms-of-use-en.html          terms-of-use-es.html
```

Bu dosyalardan birini **yeniden adlandırmak ya da taşımak, uygulamada sessizce ölü bağlantı oluşturur** — derleme hatası vermez, test kırmaz, yalnızca canlıda 404 olur. Yeniden adlandırmanız gerekiyorsa `PrivacyPolicy.kt`'yi de aynı sürümde güncelleyin.

Aynı şekilde: bu iki belge Play Console ve App Store Connect'te gizlilik politikası URL'si olarak kayıtlıdır. Erişilemez hâle gelmeleri mağaza reddi sebebidir.

---

## Sayfa haritası

| URL | Ne yapar |
|---|---|
| `/` (`index.html`) | **Dil geçidi.** Tarayıcı dilinden `index-tr/en/es.html`'e yönlendirir. Manuel seçim `sessionStorage`'a yazılır, böylece Geri tuşu döngü yapmaz. JS yoksa üç dil butonu görünür. Sitenin `x-default`'u budur. |
| `index-tr.html` · `index-en.html` · `index-es.html` | Tanıtım ana sayfaları (hero + telefon mockup slotu, modül bento'su, yol arkadaşı, oyunlaştırma bandı, iOS bülteni, altbilgi). Ekran görüntüsü bölümü **yorum içinde hazır bekliyor** — yeni 5.2 görüntüleri çekilince açılacak. |
| `privacy-policy{,-en,-es}.html` | Gizlilik politikası — 15 bölüm, üç dilde birebir aynı numaralandırma |
| `terms-of-use{,-en,-es}.html` | Kullanım koşulları — 17 bölüm, Apple'ın zorunlu EULA maddeleri §16.1'de |
| `support-tr.html` · `support-en.html` · `support-es.html` | Destek sayfası — iletişim kutusu (üstte ve altta), hesap silme, abonelik iptali, veri/gizlilik ve sık karşılaşılanlar. Üç dilde birebir aynı başlık sayısı (h2=6, h3=12) |
| `privacy.html` · `terms.html` · `support.html` | Kısa URL. Dil algılayıp yukarıdaki gerçek belgeye yönlendirir. Kimse tahmin ederek yanlış sayfaya düşmesin diye var. |
| `404.html` | GitHub Pages'in otomatik kullandığı özel 404 |

**Çok dillilik dizinle değil, dosya adı ekiyle yapılır.** Türkçe eksizdir (`privacy-policy.html`), İngilizce `-en`, İspanyolca `-es`. Ana sayfada ve destek sayfasında Türkçe de eklidir (`index-tr.html`, `support-tr.html`), çünkü kök ad dil geçidine ayrılmıştır.

> ⚠️ **`support.html` mağaza kaydına girer.** App Store Connect'teki **Support URL** ve Play Console'daki destek adresi bu kısa URL'dir (`https://getselfinity.com/support.html`). Apple, Support URL'in gerçekten destek bilgisi içeren **çalışan** bir sayfa olmasını ister (Guideline 1.5); `mailto:` kabul edilmez. Bu dosyayı yeniden adlandırmak ya da silmek mağaza reddi sebebidir — `privacy-policy*` / `terms-of-use*` ile aynı statüde tut.

---

## Sayfa düzenlerken bilinmesi gerekenler

**Paylaşılan CSS dosyası yoktur.** Her sayfa kendi `<style>` bloğunu `<head>` içinde taşır. Ortak bir görünümü değiştirmek istiyorsanız o değişikliği **her dosyada tek tek** yapmanız gerekir. Altı yasal sayfa aynı ~420 satırlık bloğu paylaşır; birini elle değiştirip diğerlerini unutmak bu repoda en kolay yapılan hatadır.

Yasal sayfaların ortak iskeleti:

```html
<body>
  <a class="back-btn-fixed">        ← ana sayfaya
  <button class="theme-toggle">     ← açık/koyu tema, localStorage 'theme'
  <div class="lang-switcher">       ← TR · EN · ES (üçü de, her sayfada)
  <div class="container">
    <div class="header">            ← mor gradyan başlık
    <div class="content">
      <div class="last-updated">    ← yürürlük tarihi + kapsam
      h2 / h3 / ul / p
      <div class="highlight-box">   ← sarı: uyarı
      <div class="good-box">        ← yeşil: olumlu taahhüt
      <div class="table-scroll"><table class="data-table">
      <div class="contact-box">     ← iletişim
      <div class="nav-links">       ← alt gezinme
```

**Tasarım sistemi (2026-07-29'dan beri):** site, uygulamanın marka paletini kullanır. Landing + yasal sayfalarda kanonik token bloğu vardır — `--bg`, `--card` (#F5F3FF açık / #171426 koyu), `--chip-wash`, `--primary` (#834CCA açık / #9D92FF koyu), `--text`, `--muted`, üç radius (`--r-bento` 24px kart, `--r-comp` 16px bileşen, `--r-micro` 8px rozet; ana CTA istisnası 28px), mor-tonlu gölgeler (`--shadow-*`) ve imza gradyanları (`--grad-hero/twilight/cta/celebration`). Yasal sayfalara ek olarak `--highlight-*`, `--good-*` ve uzun metin için `--text-body` tanımlıdır. Koyu tema `[data-theme="dark"]` ile ezilir. Kurallar: kart dolguları OPAK (rgba yasak), açık temada gri/siyah gölge yasak, buton/çipte tam daire (`border-radius: 50%`/stadyum) yasak, başlıklar Manrope / gövde Nunito (Google Fonts). Gate (`index.html`), kısa URL stub'ları ve `404.html` küçük stil blokları eski değişken adlarını (`--bg-primary`, `--accent-start`…) marka değerleriyle korur.

> Geçmişte `--highlight-bg` ve `--highlight-border` iki sayfada **kullanılıp tanımlanmamıştı**; vurgu kutuları arka plansız ve çerçevesiz render oluyordu, kimse fark etmemişti. Yeni bir değişken eklerken altı dosyanın hepsine ekleyin.

**Üç dil de eş olmalı.** Bir bölüm eklerseniz üç dile birden ekleyin; numaralandırma birebir eşleşmelidir. Hızlı kontrol:

```bash
for f in privacy-policy.html privacy-policy-en.html privacy-policy-es.html; do
  echo "$f: h2=$(grep -c '<h2>' $f) h3=$(grep -c '<h3>' $f)"
done
```

---

## Yerelde önizleme

```bash
python3 -m http.server 8000
# http://localhost:8000/                     dil geçidi
# http://localhost:8000/privacy-policy.html  TR gizlilik
```

Yönlendirmeleri test ederken tarayıcı dilini değiştirin ya da `sessionStorage.clear()` çalıştırın — manuel dil seçimi hatırlandığı için ikinci ziyarette otomatik yönlenme olmaz.

## Dağıtım

GitHub Pages, **Deploy from a branch** modunda (`main` / `(root)`). Push ettiğiniz an yayına girer, CI yoktur.

`CNAME` dosyası `getselfinity.com` içerir; DNS A kayıtları GitHub Pages'in IP'lerine (185.199.108–111.153) işaret eder. Pages ayarlarında "Enforce HTTPS" açık olmalıdır.

> **`.nojekyll` yok.** Pages bu repoyu Jekyll'den geçirir; `_` ile başlayan dosya/klasörler **sessizce yayımlanmaz**. `_archive/` bunu bilerek kullanır: eski ağır medya orada durur ve yayına çıkmaz. En temizi `_archive/`'ı repoya hiç push etmemektir (push edilse de Jekyll yayımlamaz). `_` ile başlayan ve YAYIMLANMASI gereken bir şey ekleyecekseniz önce boş bir `.nojekyll` oluşturun.

---

## Klasör yapısı

```
.
├── index.html                      dil geçidi (kök)
├── index-tr.html · index-en.html · index-es.html
├── privacy-policy{,-en,-es}.html   ⚠️ adları uygulamada sabit
├── terms-of-use{,-en,-es}.html     ⚠️ adları uygulamada sabit
├── support-{tr,en,es}.html         destek sayfaları
├── privacy.html · terms.html       kısa URL yönlendirmeleri
├── support.html                    ⚠️ mağaza kaydındaki Support URL
├── 404.html
├── CNAME · robots.txt · sitemap.xml
├── ads.txt · app-ads.txt           ⚠️ aşağıdaki nota bakın
├── images/          favicon'lar, logo (selfinity-logo-256.png), og-image.png,
│                    8 maskot (mascot-*.webp), 6 modül illüstrasyonu (ill-*.webp),
│                    404 maskotu (mascot_wanderer.png) + 3 yedek eski maskot     (~1 MB)
└── _archive/        YAYIMLANMAZ (Jekyll `_` kuralı) — eski ekran görüntüleri,
                     videolar, kullanılmayan büyük PNG'ler                      (71 MB)
```

> **Ekran görüntüsü slotları:** landing'lerdeki telefon çerçevesi, gerçek 5.2 görüntüsü için hazır. Beklenen adlar `images/screenshot-home-tr.png` / `-en` / `-es` (390×844 ya da aynı oranda). Görüntü hazır olunca hero'daki `.screen-placeholder` div'ini slottaki yorumda yazan `<img>` ile değiştirin; `#screens` bölümünün yorumunu da açabilirsiniz. ASCII ve tireli ad kullanın.

---

## `ads.txt` / `app-ads.txt` hakkında

Bu iki dosya `pub-3834148733890519` yayıncı kimliğini beyan eder ve **bilerek duruyor**. `app-ads.txt`, mağaza kaydındaki geliştirici sitesinden okunur; Play'de yayında olan **5.1.x sürümü hâlâ AdMob reklamı gösteriyor**. Silinmeleri canlı reklam gelirini kırar.

Yeni KMP sürümünde (5.2.0) reklam yoktur. 5.1.x trafiği tamamen bittikten sonra bu iki dosya kaldırılabilir.

---

## İlgili belgeler

- Mağaza beyanları (Play Data Safety + Apple App Privacy), kanıt dosya yollarıyla: uygulama reposunda `kmp-migration/docs/store-privacy-disclosures.md`
- Uygulama içindeki URL sabitleri: `shared/src/commonMain/kotlin/com/mindoria/selfinity/core/PrivacyPolicy.kt`

## Lisans

Site kodu projeyle aynı lisansa tabidir. Görseller, maskotlar ve ekran görüntüleri Selfinity markasının parçasıdır; izinsiz kullanılamaz.
