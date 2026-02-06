# QuakeSafe Next.js Edition

Bu proje **Next.js 14**, **TypeScript** ve **Tailwind CSS** kullanılarak oluşturulmuştur.

## Kurulum ve Çalıştırma

Projeyi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edin:

### 1. Terminali Açın
VS Code içinde üst menüden **Terminal > New Terminal** seçeneğine tıklayın.

### 2. Klasöre Girin
Terminalde şu komutu yazıp Enter'a basın:
```bash
cd quakesafe-next
```

### 3. Paketleri Yükleyin
Gerekli kütüphanelerin indirilmesi için şu komutu çalıştırın:
```bash
npm install
```
*(Bu işlem internet hızınıza göre 1-2 dakika sürebilir)*

### 4. Uygulamayı Başlatın
Kurulum bittikten sonra projeyi çalıştırmak için:
```bash
npm run dev
```

### 5. Tarayıcıda Açın
Terminalde "Ready" mesajını gördüğünüzde, tarayıcınızdan şu adrese gidin:
[http://localhost:3000](http://localhost:3000)

## Proje Yapısı

- `app/page.tsx`: Ana Sayfa tasarımı ve kodları.
- `app/settings/page.tsx`: Ayarlar sayfası ve mantığı.
- `app/globals.css`: Tüm stiller ve Tailwind ayarları.
- `app/layout.tsx`: Genel sayfa düzeni ve navigasyon barı.
