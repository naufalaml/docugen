# 📄 DocuGen - Generator Dokumen Otomatis Indonesia

> Buat surat lamaran kerja, CV ATS-friendly, surat pengunduran diri, surat izin, dan surat kuasa secara online **GRATIS**. Download PDF siap cetak dalam hitungan detik.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Fitur

- 📝 **5 Jenis Dokumen** — Surat Lamaran, CV ATS, Surat Resign, Surat Izin, Surat Kuasa
- 👁️ **Live Preview** — Lihat dokumen berubah real-time saat mengisi form
- 📥 **Download PDF** — Satu klik download PDF siap cetak (format A4)
- 🎨 **Template Switcher** — Pilih antara template gratis & premium
- 💾 **Auto-Save Draft** — Data form tersimpan otomatis di browser
- 🌙 **Dark/Light Mode** — Toggle tema sesuai preferensi
- 📱 **Responsive** — Tampil sempurna di mobile & desktop
- 🔒 **Privasi Aman** — Semua proses di browser, data tidak dikirim ke server

## 🚀 Cara Pakai

### Online
Kunjungi website: [https://docugen.id](https://docugen.id)

### Lokal
```bash
# Clone repository
git clone https://github.com/USERNAME/docugen.git
cd docugen

# Jalankan server lokal
python -m http.server 3000

# Buka browser
# http://localhost:3000
```

## 💰 Monetisasi

### Adsterra Ads
Website sudah disiapkan slot iklan Adsterra:
1. Daftar di [adsterra.com](https://www.adsterra.com)
2. Tambahkan website kamu
3. Pilih jenis iklan (Banner, Popunder, Native, Social Bar)
4. Paste kode iklan di `index.html` pada slot yang sudah disediakan

### Premium Template (Coming Soon)
- Template eksklusif dengan desain profesional
- Sistem pembayaran terintegrasi

### Affiliate Links
- Jasa cetak dokumen
- Platform rekrutmen
- Kursus online bersertifikat

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Core | HTML5 + CSS3 + Vanilla JavaScript (ES Modules) |
| PDF | html2pdf.js (CDN) |
| Font | Google Fonts (Plus Jakarta Sans + Inter) |
| Deploy | Static hosting (GitHub Pages / Netlify / Vercel) |

## 📁 Struktur Folder

```
docugen/
├── index.html          # Landing page + SPA
├── main.js             # App entry point
├── css/
│   ├── index.css       # Design system & global styles
│   ├── components.css  # Reusable component styles
│   └── generator.css   # Generator page styles
├── js/
│   ├── router.js       # Hash-based SPA router
│   ├── pdf.js          # PDF generation module
│   ├── generator.js    # Document generator logic
│   ├── utils/
│   │   ├── storage.js  # localStorage draft management
│   │   └── theme.js    # Dark/light mode toggle
│   └── templates/
│       ├── surat-lamaran.js
│       ├── cv-ats.js
│       ├── surat-resign.js
│       ├── surat-izin.js
│       └── surat-kuasa.js
├── .gitignore
└── README.md
```

## 📄 License

MIT License - Bebas digunakan dan dimodifikasi.

## 🤝 Kontribusi

Pull request sangat welcome! Untuk perubahan besar, silakan buka issue terlebih dahulu.

---

Made with ❤️ in Indonesia
