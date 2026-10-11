#!/bin/bash
# ==============================================================================
# PERDASAMA Platform - Skrip Penerapan Automatik VPS (Deployment Script)
# ==============================================================================

set -e

APP_DIR="/var/www/perdasama"
REPO_URL="https://github.com/harhmd/Perdasama.git"

echo "=========================================="
echo "🚀 Memulakan Penerapan PERDASAMA ke VPS..."
echo "=========================================="

# 1. Pastikan Docker dipasang
if ! command -v docker &> /dev/null; then
    echo "⚠️ Docker tidak dijumpai. Memasang Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    systemctl enable --now docker
fi

# 2. Pastikan Docker Compose dipasang
if ! docker compose version &> /dev/null; then
    echo "⚠️ Docker Compose plugin tidak dijumpai. Memasang docker-compose-plugin..."
    apt-get update && apt-get install -y docker-compose-plugin
fi

# 3. Klon atau Tarik Kod Terkini dari Git
if [ -d "$APP_DIR/.git" ]; then
    echo "📦 Mengemas kini kod dari repositori Git..."
    cd "$APP_DIR"
    git fetch --all
    git reset --hard origin/main || git reset --hard origin/master
else
    echo "📦 Mengklon repositori PERDASAMA..."
    mkdir -p "$APP_DIR"
    git clone "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# 4. Bina dan Lancarkan Kontena Docker
echo "🐳 Membina dan melancarkan imej Docker..."
docker compose down || true
docker compose up -d --build

# 5. Uji Sambungan Kesihatan Sistem
echo "⏳ Memeriksa status kesihatan pelayan..."
sleep 5

if curl -s http://127.0.0.1:3000/api/health | grep -q "ok"; then
    echo "===================================================="
    echo "✅ Penerapan Berjaya! PERDASAMA kini aktif di port 3000"
    echo "🌐 Akses URL: http://$(curl -s ifconfig.me):3000"
    echo "===================================================="
else
    echo "⚠️ Amaran: Ujian kesihatan belum sedia. Sila semak log dengan: docker logs perdasama-app"
fi
