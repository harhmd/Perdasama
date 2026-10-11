# PERDASAMA - Platform Keahlian Korporat & Kad Digital

Platform digital rasmi bagi **Dewan Usahawan Melayu Malaysia (PERDASAMA)** yang menyediakan profil ahli korporat berprestij, kad keahlian digital pintar dengan sokongan NFC & kod QR, direktori ahli perniagaan, pengurusan rakan niaga, serta takwim agenda antarabangsa.

---

## 🌟 Ciri-Ciri Utama Platform

1. **Kad Keahlian Digital Logam Emas (Gold Metallic Card):**
   - Paparan kad interaktif dengan animasi kilauan logam (*shine sweep*)
   - Sokongan pelepasan pantas NFC (*Near Field Communication*) & kod QR
   - Pautan simpan ke **Apple Wallet** & **Google Wallet**
   - Butang muat turun kenalan **vCard (.vcf)**

2. **Dossier Usahawan & Perniagaan:**
   - Ringkasan profil syarikat, status pusingan pembiayaan (Seri B)
   - Metrik hasil tahunan (RM 85.0M), tenaga kerja, dan skor jaringan

3. **Perkhidmatan Ahli & Konsierj VIP:**
   - Pelepasan Maya untuk akses ekspres majlis rasmi
   - Padanan Perniagaan (B2B) pelaburan & kontrak
   - Jaringan Syarikat Berkaitan Kerajaan (GLC) & agensi
   - Konsierj VIP 24/7 dengan pautan WhatsApp terus kepada pegawai perhubungan

4. **Rangkaian Rakan Niaga & Lembaga Pengarah:**
   - Senarai interaktif rakan kongsi dengan fungsi panggilan dan emel
   - Modal pendaftaran rakan niaga baharu (*dynamic partner registration*)

5. **Papan Pemuka 4-Tab Penuh:**
   - **Keahlian:** Profil rasmi dan kad digital
   - **Ringkasan (Executive Overview):** Penarafan ESG A+, pensijilan Halal JAKIM, kelulusan MDA & ucaptama
   - **Direktori:** Carian pantas ahli korporat rentas kluster industri
   - **Agenda:** RSVP kehadiran ke Misi Dagangan Antarabangsa (Davos, AGM PERDASAMA, B2B Summit)

---

## 🛠️ Struktur Fail Projek

```text
perdasama/
├── public/
│   ├── index.html       # Antara muka web responsif & modal interaktif
│   ├── css/
│   │   └── style.css    # Animasi kad logam, gelombang radar NFC & tema gelap
│   └── js/
│       └── app.js       # Logik pertukaran tab, carian, RSVP, vCard & modal
├── server.js            # Pelayan Node.js Express & API endpoint REST
├── Dockerfile           # Konfigurasi binaan kontena pengeluaran
├── docker-compose.yml   # Orkestrasi Docker untuk VPS
├── nginx.conf           # Konfigurasi Proksi Songsang Nginx
├── deploy.sh            # Skrip penerapan automatik 1-klik ke VPS
├── package.json         # Dependensi projek
└── README.md            # Dokumentasi lengkap
```

---

## 💻 Pembangunan Setempat (Local Development)

```bash
# 1. Masuk ke direktori projek
cd perdasama

# 2. Pasang dependensi
npm install

# 3. Jalankan pelayan pembangunan
npm start
```

Buka pelayar web di: `http://localhost:3000`

---

## 🚀 Panduan Tolak ke Git (Push to Git)

```bash
# 1. Inisialisasi repositori Git (jika belum)
git init
git add .
git commit -m "feat: inisialisasi platform keahlian korporat perdasama"

# 2. Tetapkan cawangan utama
git branch -M main

# 3. Tambah URL repositori GitHub anda
git remote add origin https://github.com/harhmd/Perdasama.git

# 4. Tolak kod ke GitHub
git push -u origin main
```

---

## 🌐 Panduan Penerapan ke VPS (Deploy to VPS)

### Kaedah 1: Menggunakan Skrip Automatik `deploy.sh` (Paling Pantas)
Pada terminal VPS Ubuntu / Debian anda:
```bash
curl -fsSL https://raw.githubusercontent.com/harhmd/Perdasama/main/deploy.sh | bash
```

### Kaedah 2: Menggunakan Docker Compose secara Manual
```bash
# Klon repositori pada VPS
git clone https://github.com/harhmd/Perdasama.git /var/www/perdasama
cd /var/www/perdasama

# Jalankan dengan Docker Compose
docker compose up -d --build
```
Aplikasi kini aktif pada `http://IP_VPS_ANDA:3000`.

### Kaedah 3: Penerapan 1-Klik melalui Coolify
1. Buka papan pemuka **Coolify** anda di VPS.
2. Pilih **New Resource** > **Public / Private Git Repository**.
3. Masukkan URL: `https://github.com/harhmd/Perdasama.git`.
4. Pilih kaedah binaan: **Dockerfile** atau **Docker Compose**.
5. Tetapkan port: `3000`.
6. Klik **Deploy**.

---

Dikuasakan oleh **Dewan Usahawan Melayu Malaysia (PERDASAMA)**. Hak Cipta Terpelihara.
