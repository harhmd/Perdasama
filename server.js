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

// Mock In-Memory Database for Partners
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
  },
  {
    id: "PDS-MY-2024-0671",
    name: "Dato' Kamarulzaman Hashim",
    company: "SiberNetica Solutions Malaysia",
    tier: "Emas Korporat",
    cluster: "Teknologi & Keselamatan Siber",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    status: "Aktif",
    revenue: "RM 32.0M",
    location: "Cyberjaya"
  },
  {
    id: "PDS-MY-2025-1102",
    name: "Dr. Nurul Ain Binti Razak",
    company: "Medika Diagnostics Nusantara",
    tier: "Perak Korporat",
    cluster: "Peranti Perubatan",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    status: "Aktif",
    revenue: "RM 18.2M",
    location: "Pulau Pinang"
  }
];

// Agenda & Misi Dagangan
const agenda = [
  {
    id: 1,
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
    id: 2,
    title: "Sesi Padanan Perniagaan (B2B) GLC & Swasta",
    date: "5 Feb 2025",
    time: "09:00 PG - 04:30 PTG",
    location: "Grand Hyatt Kuala Lumpur",
    organizer: "Biro Pelaburan PERDASAMA Kebangsaan",
    badge: "Eksklusif",
    status: "Terbuka",
    desc: "Peluang pembekalan dan vendor strategik bersama Khazanah, PNB, dan syarikat berkaitan kerajaan."
  },
  {
    id: 3,
    title: "Mesyuarat Agung Tahunan (AGM) PERDASAMA Ke-26",
    date: "14 Mac 2025",
    time: "08:30 PG - 01:00 PTG",
    location: "Pusat Dagangan Dunia (WTC) KL",
    organizer: "Majlis Tertinggi PERDASAMA",
    badge: "Rasmi",
    status: "Wajib Hadir",
    desc: "Pembentangan laporan tahunan, pelan induk pendigitalan usahawan Bumiputera 2030, dan pemilihan biro."
  },
  {
    id: 4,
    title: "Sidang Kemuncak Inovasi Bioteknologi ASEAN",
    date: "28 April 2025",
    time: "10:00 PG - 05:00 PTG",
    location: "Suntec Singapore Convention Centre",
    organizer: "ASEAN Business Advisory Council",
    badge: "Serantau",
    status: "Jemputan Khas",
    desc: "Ucaptama Dato' Dr. Megat Azlan berkenaan komersialisasi genomik AI merentas sempadan ASEAN."
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
    membershipId: "#PDS-MY-2025-0849",
    name: "Dato' Dr. Megat Azlan bin Megat Tariq",
    company: "Apex BioVentures Group Sdn Bhd",
    tier: "Platinum Korporat",
    status: "Ahli Seumur Hidup",
    registeredDate: "12 Mac 2018",
    expiryDate: "Seumur Hidup",
    nfcStatus: "Diaktifkan",
    dossier: {
      statusRound: "Aktif • Seri B",
      tags: ["Bioteknologi & AI", "Kluster Inovasi Nasional", "Eksport Serantau"],
      metrics: {
        annualRevenue: "RM 85.0M",
        revenueYoY: "+34% YoY",
        workforce: "240 Staf",
        workforceType: "Pekerja Tempatan",
        networkScore: 98,
        networkLevel: "Super Connector"
      },
      summary: "Dato' Dr. Megat Azlan memimpin pengkomersialan diagnostik genomik dan automasi bionik berasaskan kecerdasan buatan (AI) di rantau ASEAN, berkhidmat sebagai Pengerusi Kluster Inovasi Kesihatan Perdasama."
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
