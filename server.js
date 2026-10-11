const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from public
app.use(express.static(path.join(__dirname, 'public')));

// Mock In-Memory Database for Partners & Board
let partners = [
  {
    id: 1,
    name: "Datin Rachel Sterling",
    role: "Pengarah Saintifik & Penyelidikan",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuX7B5__N2ggcnbFB_iDsAvc-wGjv8fDswchJ1mHO0yHNIeL1teZ8p3F7gP6rc63vpucBLO6H2W5mCWGlYAsc7v51vZIBEq7INmUG2HOeOOUCxOKbnv4Rx_maEyqyGEzlm8dYO9Dfvild3lCRu98AFbfor7lwoIUttCBXvjCHUFyNffm-bcyVTHzNEzqtJyWFUM5JmOmxz07_dY1_aJnn2VXxv2MNy4KdGnf7i89Abdrx-Xdorgal6",
    tags: ["Rakan Pengasas", "Rakan Ekuiti"],
    phone: "+60123456789",
    email: "rachel.sterling@apexbio.com.my"
  },
  {
    id: 2,
    name: "Daniel Wu",
    role: "Rakan Modal Teroka, Horizon Alpha VC",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDE7F3SOXoNITMKuXZ-oIi9GvuON5-duwT3BIhgD-L84Qc0XtAzPNnJU_5fkcCZHJrVIzMqKez1n7ADrKKT9pJ0Gb5FT582VtUallwL99QZR-4ElsmQwolYG7mifbA7AJe64X-g_L_DLdWwwdPXvr3gjpdgb0MC01zWxKTzqB0yTGaGSfnoAKEMoftexxZqaPVc2eBYhEzRnRsaLQOWoi6cLKNWenOcvrKx9pdN1bRXHf84_u1olamn",
    tags: ["Pelabur Seri B", "Ahli Lembaga"],
    phone: "+60198765432",
    email: "daniel.wu@horizonalpha.vc"
  }
];

// Directory of Corporate Members
const directory = [
  {
    id: "PDS-HQ-1998-0057",
    name: "Ts. Hj Nor Azhar Bin Abdul Hamid",
    credentials: "(MBA) (HE) (BCM)",
    company: "Ibu Pejabat PERDASAMA Kebangsaan",
    role: "Ahli Lembaga Penasihat",
    tier: "Lembaga Penasihat",
    cluster: "Kepimpinan Korporat & Digital",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    status: "Aktif",
    revenue: "27 Tahun (1998 - 2025)",
    location: "Kuala Lumpur"
  },
  {
    id: "PDS-MY-2025-0849",
    name: "Dato' Dr. Megat Azlan bin Megat Tariq",
    company: "Apex BioVentures Group Sdn Bhd",
    tier: "Platinum Korporat",
    cluster: "Bioteknologi & AI",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZAwA1TGYoxecYF0pirKumKQCCY0HdzsexvgbIKmu9_g2SVltr0XY2ZGJYD4a9v2yrYjS3ju8v0mUquwb_5JLVG5FNgw65CEZ38MgcgOXA0undoOOFumypFplwb-ACduFZjLOP78q6FPMA_Z8_PlRLGaZ0dVbt8QPej42XIuHW4GFxyfwLkwtpVmekgX7RR6OdWsItCFJJIQJw-bZiQ901K_sLemzHE5sLLIuQdExCGlOitrg024gd",
    status: "Aktif",
    revenue: "RM 85.0M",
    location: "Kuala Lumpur"
  },
  {
    id: "PDS-MY-2024-0312",
    name: "Tan Sri Ir. Ahmad Zulkifli",
    company: "Nusantara Infra & Green Energy Bhd",
    tier: "Platinum Korporat",
    cluster: "Tenaga Hijau & ESG",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: "Aktif",
    revenue: "RM 142.0M",
    location: "Shah Alam, Selangor"
  },
  {
    id: "PDS-MY-2025-0199",
    name: "Datin Seri Faridah Hanim",
    company: "Selera Warisan Halal Foodtech Sdn Bhd",
    tier: "Emas Korporat",
    cluster: "Agromakanan & Eksport",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    status: "Aktif",
    revenue: "RM 48.5M",
    location: "Johor Bahru, Johor"
  }
];

// Agenda & Misi Dagangan
const agenda = [
  {
    id: 1,
    title: "Sambutan 27 Tahun PERDASAMA (1998 - 2025)",
    date: "12 - 14 Feb 2025",
    time: "09:00 PG - 05:00 PTG",
    location: "Pusat Dagangan Dunia (WTC) Kuala Lumpur",
    organizer: "Majlis Tertinggi & Lembaga Penasihat PERDASAMA",
    badge: "Jubli Ke-27",
    status: "Disahkan",
    desc: "Meraikan 27 tahun PERDASAMA Mengorak Langkah memacu ekonomi usahawan Melayu Malaysia dengan ucaptama kepimpinan tertinggi."
  },
  {
    id: 2,
    title: "Misi Dagangan & Pelaburan Davos 2025",
    date: "18 - 23 Jan 2025",
    time: "Sepanjang Hari",
    location: "Davos Congress Centre, Switzerland",
    organizer: "Delegasi Bersama MITI & PERDASAMA",
    badge: "Antarabangsa",
    status: "Disahkan",
    desc: "Forum Ekonomi Dunia membabitkan perbincangan pelaburan terus asing (FDI) bagi sektor bioteknologi tinggi dan AI."
  },
  {
    id: 3,
    title: "Sesi Padanan Perniagaan (B2B) GLC & Swasta",
    date: "5 Mac 2025",
    time: "09:00 PG - 04:30 PTG",
    location: "Menara Arina Uniti & Grand Hyatt KL",
    organizer: "Biro Pelaburan PERDASAMA Kebangsaan",
    badge: "Eksklusif",
    status: "Terbuka",
    desc: "Peluang pembekalan dan vendor strategik bersama GLC dan agensi peneraju pelaburan kebangsaan."
  }
];

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'PERDASAMA Corporate Platform',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api/profile', (req, res) => {
  res.json({
    membershipId: "#PDS-HQ-1998-0057",
    cardNumber: "2798 1998 2025 0057",
    name: "Ts. Hj Nor Azhar Bin Abdul Hamid",
    credentials: "(MBA) (HE) (BCM)",
    role: "Ahli Lembaga Penasihat",
    organization: "PERDASAMA Kebangsaan (Dewan Usahawan Melayu Malaysia)",
    anniversary: "27 Tahun (1998 - 2025) Mengorak Langkah",
    tier: "Lembaga Penasihat Kebangsaan",
    status: "Ahli Seumur Hidup",
    registeredDate: "1998",
    expiryDate: "Seumur Hidup",
    phone: "+6017-5050057",
    officeTel: "03-27796292",
    officeFax: "03-2779 6200",
    email: "azhabdhamid@gmail.com",
    address: {
      line1: "Ibu Pejabat PERDASAMA",
      line2: "Level 7, Menara Arina Uniti,",
      line3: "Jalan Raja Muda Abdul Aziz, 50300 Kuala Lumpur."
    },
    website: "www.perdasamanasional.org",
    social: {
      instagram: "perdasamanasional",
      facebook: "Perdasama Nasional",
      youtube: "@Perdasamanasionaltv"
    },
    dossier: {
      statusRound: "Kepimpinan Tertinggi • 27 Tahun",
      tags: ["Ahli Lembaga Penasihat", "Advokasi Korporat", "Ekosistem Usahawan Melayu"],
      metrics: {
        experience: "27 Tahun",
        roleLevel: "Penasihat Kebangsaan",
        networkScore: 99,
        networkLevel: "Peneraju Utama"
      },
      summary: "Ts. Hj Nor Azhar Bin Abdul Hamid (MBA) (HE) (BCM) berkhidmat sebagai Ahli Lembaga Penasihat PERDASAMA Kebangsaan di Ibu Pejabat Menara Arina Uniti Kuala Lumpur, menyumbang kepakaran kepimpinan dan jaringan strategik dalam memacu agenda 'Mengorak Langkah' 27 Tahun PERDASAMA (1998 - 2025)."
    }
  });
});

app.get('/api/partners', (req, res) => {
  res.json({ success: true, count: partners.length, data: partners });
});

app.post('/api/partners', (req, res) => {
  const { name, role, phone, email, tags } = req.body;
  if (!name || !role) {
    return res.status(400).json({ success: false, message: "Nama dan peranan diperlukan" });
  }

  const newPartner = {
    id: partners.length + 1,
    name,
    role,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    tags: Array.isArray(tags) ? tags : ["Rakan Strategik"],
    phone: phone || "+60100000000",
    email: email || "partner@perdasama.org.my"
  };

  partners.push(newPartner);
  res.status(201).json({ success: true, message: "Rakan niaga berjaya ditambah", data: newPartner });
});

app.get('/api/directory', (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  const cluster = req.query.cluster || '';

  let filtered = directory;
  if (query) {
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.company.toLowerCase().includes(query) ||
      item.cluster.toLowerCase().includes(query)
    );
  }
  if (cluster && cluster !== 'all') {
    filtered = filtered.filter(item => item.cluster.toLowerCase().includes(cluster.toLowerCase()));
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

app.get('/api/agenda', (req, res) => {
  res.json({ success: true, count: agenda.length, data: agenda });
});

// Fallback to index.html for SPA-like routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 PERDASAMA Corporate Platform running on port ${PORT}`);
  console.log(`🌐 Local access: http://localhost:${PORT}`);
});
