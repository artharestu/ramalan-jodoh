# 🔮 Ramalan Jodoh Interaktif 💖

![Ramalan Jodoh](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

**Ramalan Jodoh Interaktif** adalah aplikasi web modern bernuansa *game* hiburan yang seru dan dinamis untuk mengacak dan menentukan calon jodoh dari pilihan yang kamu masukkan! Dilengkapi dengan animasi *slot machine*, efek suara sintetis (Web Audio API), selebrasi confetti, serta statistik kecocokan yang detail dan unik.

---

## ✨ Fitur Utama

- 📝 **Input Interaktif & Validasi Real-time**  
  Masukkan nama kamu dan 3 kandidat calon jodoh impianmu.
- 🎰 **Animasi Shuffle / Slot Machine**  
  Efek kocokan kandidat yang dinamis dan menegangkan menggunakan **Framer Motion**.
- 🔊 **Sound Effect Dinamis (Web Audio API)**  
  Efek suara klik, *shuffling*, dan *fanfare* kemenangan secara sintetis tanpa perlu memuat file audio eksternal.
- 📊 **Analisis & Breakdown Kecocokan Detail**  
  - **Tingkat Kecocokan (%):** Persentase jodoh mulai dari 78% hingga 99%.
  - **4 Aspek Chemistry:** *Chemistry Love*, *Kesesuaian Humor*, *Kesetiaan Hati*, dan *Hoki & Rezeki*.
  - **Gelar/Badge Unik:** Misal *"Takdir Ilahi 💖"*, *"Pasangan Sultan 👑"*, atau *"Belahan Jiwa Sejati ✨"*.
  - **Narasi Ramalan Lucu & Manis:** Prediksi hubungan yang menghibur.
- 🎉 **Selebrasi Confetti**  
  Ledakan confetti warna-warni saat hasil ramalan keluar.
- 📋 **Bagikan Hasil Mudah**  
  Salin rangkuman hasil ramalan cinta kamu ke *clipboard* hanya dengan satu klik untuk dibagikan ke media sosial.
- 💎 **Desain Premium Glassmorphism**  
  Antarmuka visual modern dengan warna neon, efek *glowing*, dan mendukung respon *haptic feedback* di perangkat mobile.

---

## 🛠️ Teknologi yang Digunakan

- **[React 19](https://react.dev/)** — Library UI berbasis komponen.
- **[Vite 8](https://vitejs.dev/)** — Frontend build tool super cepat.
- **[Framer Motion](https://framer.com/motion)** — Library animasi intuitif untuk React.
- **[Lucide React](https://lucide.dev/)** — Koleksi ikon modern.
- **[Canvas Confetti](https://github.com/catdad/canvas-confetti)** — Efek pesta selebrasi visual.
- **Web Audio API** — Pembentuk efek suara sintetis secara native di browser.

---

## 📁 Struktur Proyek

```text
Ramalan Jodoh/
├── public/              # Asset statis
├── src/
│   ├── assets/          # Asset gambar / media
│   ├── components/      # Komponen React
│   │   ├── Header.jsx           # Header & Logo aplikasi
│   │   ├── InputForm.jsx        # Form masukan nama & 3 kandidat
│   │   ├── ShuffleAnimation.jsx # Animasi pengacak kandidat
│   │   └── ResultModal.jsx      # Tampilan hasil & statistik kecocokan
│   ├── utils/           # Utility & Logika Aplikasi
│   │   ├── audio.js             # Pengelola efek suara sintetis (Web Audio API)
│   │   └── fortuneGenerator.js  # Generator persentase, statistik, & narasi
│   ├── App.jsx          # Komponen utama & Pengatur State Game
│   ├── App.css          # Style tambahan
│   ├── index.css        # Desain sistem (Glassmorphism & Utilitas)
│   └── main.jsx         # Entry point aplikasi
├── index.html
├── package.json
└── README.md
```

---

## 🚀 Cara Menjalankan secara Lokal

### Prasyarat
Pastikan kamu telah menginstall **[Node.js](https://nodejs.org/)** (Versi 18 atau lebih baru).

### Langkah-langkah

1. **Clone Repository**
   ```bash
   git clone https://github.com/artharestu/ramalan-jodoh.git
   cd ramalan-jodoh
   ```

2. **Install Dependensi**
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembang (Development Server)**
   ```bash
   npm run dev
   ```
   Buka browser dan akses alamat yang tertera (biasanya `http://localhost:5173`).

4. **Build untuk Produksi**
   ```bash
   npm run build
   ```
   Hasil build akan tersimpan di dalam folder `dist/`.

---

## 📄 Lisensi

Proyek ini dibuat untuk tujuan hiburan dan pembelajaran. Bebas digunakan dan dikembangkan kembali di bawah lisensi MIT.

Made with ❤️ & React by [Arta Restu](https://github.com/artharestu).
