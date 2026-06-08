# 💰 Panduan Monetisasi DocuGen dengan Adsterra

## Langkah 1: Daftar Adsterra
1. Buka [https://www.adsterra.com](https://www.adsterra.com)
2. Klik **"Sign Up"** → pilih **Publisher**
3. Isi data registrasi
4. Verifikasi email

## Langkah 2: Tambahkan Website
1. Di dashboard, klik **"Websites"** → **"Add Website"**
2. Masukkan URL website kamu (misal: `https://docugen.id` atau `https://username.github.io/docugen`)
3. Pilih kategori: **Tools/Services**
4. Tunggu approval (biasanya 1-2 hari)

## Langkah 3: Pilih Jenis Iklan

### 🔥 Rekomendasi Iklan untuk Penghasilan Maksimal:

### 1. Social Bar (⭐ PALING DISARANKAN)
- CPM tinggi, tidak mengganggu
- Tampil sebagai notifikasi di pojok bawah
- **Cara pasang:**
  ```html
  <!-- Paste di dalam <head> di index.html -->
  <script async src="//pl.adsterra.com/KODE_KAMU.js"></script>
  ```

### 2. Popunder
- CPM paling tinggi
- Buka tab baru saat user klik halaman
- **Cara pasang:**
  ```html
  <!-- Paste sebelum </body> di index.html -->
  <script async src="//pl.adsterra.com/KODE_POPUNDER_KAMU.js"></script>
  ```

### 3. Native Banner (300x250 atau 728x90)
- Tampil natural seperti konten
- Cocok di antara section landing page
- **Cara pasang:**
  Ganti isi `<div id="adsterra-native-1">` di `main.js` dengan kode dari Adsterra

### 4. Banner Display (728x90, 468x60)
- Banner klasik di atas/bawah halaman
- **Cara pasang:**
  Paste kode di `<div id="adsterra-top">` atau `<div id="adsterra-footer">` di `index.html`

## Langkah 4: Slot Iklan yang Tersedia

Website DocuGen sudah menyiapkan slot berikut:

| Slot ID | Lokasi | Ukuran Ideal |
|---------|--------|--------------|
| `adsterra-top` | Di bawah navbar (index.html) | 728x90 |
| `adsterra-native-1` | Antara Hero dan Pilih Dokumen (main.js) | 300x250 / 728x90 |
| `adsterra-native-2` | Antara Cara Kerja dan Testimonial (main.js) | 300x250 |
| `adsterra-native-3` | Di bawah Rekomendasi (main.js) | 728x90 |
| `adsterra-footer` | Di footer (index.html) | 468x60 / 728x90 |

## Langkah 5: Estimasi Penghasilan

| Metrik | Estimasi |
|--------|----------|
| Traffic harian (target) | 500 - 2,000 visitors |
| CPM Social Bar | $1 - $5 |
| CPM Popunder | $2 - $8 |
| CPM Native | $0.5 - $3 |
| **Potensi bulanan** | **$50 - $500+** |

## Tips Meningkatkan Penghasilan

1. **SEO** — Optimalkan untuk keyword "contoh surat lamaran kerja", "template CV ATS", dll.
2. **Konten Blog** — Tambahkan blog dengan artikel tips melamar kerja (meningkatkan traffic organik)
3. **Share di sosmed** — Promosikan di grup Facebook, Twitter, TikTok
4. **Campurkan tipe iklan** — Social Bar + Native Banner = optimal
5. **Jangan terlalu banyak iklan** — Maksimal 3-4 slot agar tidak mengganggu UX
