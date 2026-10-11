// PERDASAMA Corporate Platform Client App
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initModals();
  initDirectorySearch();
  initAgendaActions();
  initPartnerForm();
  initShareActions();
  initQRCodes();
});

// Toast notification helper
function showToast(message, type = 'success') {
  const existing = document.getElementById('toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.className = `fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold backdrop-blur-md border toast-slide ${
    type === 'success' 
      ? 'bg-blue-900 text-amber-300 border-amber-400/60' 
      : 'bg-slate-900 text-white border-slate-700'
  }`;
  
  const icon = type === 'success' ? 'check_circle' : 'info';
  toast.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">${icon}</span><span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, -10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// ==========================================
// REAL SCANNABLE QR CODE ENGINE
// ==========================================
let currentQRDataUrl = "";
let currentVerificationUrl = "";
let whatsappDirectUrl = "https://wa.me/60175050057?text=Salam%20Ts%20Hj%20Nor%20Azhar,%20saya%20menghubungi%20melalui%20Kad%20Digital%20PERDASAMA";

function generateQrDataUrl(text, cellSize = 6) {
  if (typeof qrcode === 'function') {
    try {
      const qr = qrcode(0, 'M');
      qr.addData(text);
      qr.make();
      return qr.createDataURL(cellSize, 2);
    } catch (e) {
      console.warn("Local qrcode generator error:", e);
    }
  }
  // Online fallback if offline engine fails
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=2&data=${encodeURIComponent(text)}`;
}

function initQRCodes() {
  // Determine canonical verification URL
  const origin = (window.location.origin && window.location.origin !== 'null' && window.location.origin !== 'file://')
    ? window.location.origin
    : 'http://65.75.201.219:3000';
  
  currentVerificationUrl = `${origin}/#PDS-HQ-1998-0057`;
  
  // Use WhatsApp link for direct card scan as featured on the business card
  currentQRDataUrl = generateQrDataUrl(whatsappDirectUrl, 6);

  // 1. Mini QR in Virtual Credit Card (Back)
  const miniQrEl = document.getElementById('card-mini-qr');
  if (miniQrEl) {
    miniQrEl.src = currentQRDataUrl;
  }

  // 2. Large QR in Official Member QR Modal
  const modalQrEl = document.getElementById('modal-qr-code-img');
  if (modalQrEl) {
    modalQrEl.src = currentQRDataUrl;
  }

  // 3. QR in Share Modal
  const shareQrEl = document.getElementById('share-modal-qr-img');
  if (shareQrEl) {
    shareQrEl.src = currentQRDataUrl;
  }

  // 4. Verification link display text
  const urlDisplay = document.getElementById('qr-verified-url');
  if (urlDisplay) {
    urlDisplay.textContent = "wa.me/60175050057 (WhatsApp Rasmi)";
  }

  // 5. Wire copy button inside QR Modal
  const btnCopyQrUrl = document.getElementById('btn-copy-qr-url');
  if (btnCopyQrUrl) {
    btnCopyQrUrl.addEventListener('click', () => {
      navigator.clipboard?.writeText(whatsappDirectUrl).then(() => {
        showToast('Pautan WhatsApp Ts. Hj Nor Azhar disalin!');
      }).catch(() => {
        showToast('Pautan berjaya disalin');
      });
    });
  }

  // 6. Wire download PNG button
  const btnDownloadQr = document.getElementById('btn-download-qr-png');
  if (btnDownloadQr) {
    btnDownloadQr.addEventListener('click', downloadQRCodePng);
  }
}

function openMemberQRModal() {
  openModal('modal-qr-code');
}

function toggleCardFlip(e) {
  if (e && e.target && (e.target.id === 'card-mini-qr' || e.target.closest('#card-mini-qr'))) {
    openMemberQRModal();
    return;
  }
  const card = document.getElementById('virtual-credit-card');
  const hint = document.getElementById('flip-hint-text');
  if (card) {
    card.classList.toggle('flipped');
    const isFlipped = card.classList.contains('flipped');
    if (hint) {
      hint.textContent = isFlipped ? 'Muka Depan (Front)' : 'Pusingkan Kad (Flip)';
    }
  }
}

function downloadQRCodePng() {
  if (!currentQRDataUrl) {
    showToast('Kod QR belum sedia untuk dimuat turun', 'error');
    return;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  img.onload = () => {
    canvas.width = 420;
    canvas.height = 510;

    // Background
    ctx.fillStyle = '#071c3d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header badge
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 16px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('27 TAHUN PERDASAMA (1998 - 2025)', 210, 38);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText('Dewan Usahawan Melayu Malaysia • Mengorak Langkah', 210, 58);

    // White card background for QR
    ctx.fillStyle = '#ffffff';
    ctx.roundRect ? ctx.roundRect(45, 78, 330, 330, 16) : ctx.fillRect(45, 78, 330, 330);
    ctx.fill();

    // Draw QR image
    ctx.drawImage(img, 60, 93, 300, 300);

    // Member Info footer
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillText("TS. HJ NOR AZHAR BIN ABDUL HAMID", 210, 440);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillText("(MBA) (HE) (BCM) • Ahli Lembaga Penasihat", 210, 460);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText("+6017-5050057 • azhabdhamid@gmail.com", 210, 480);

    // Trigger download
    const link = document.createElement('a');
    link.download = 'PERDASAMA_QR_TS_HJ_NOR_AZHAR.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Gambar Kod QR WhatsApp berjaya dimuat turun!');
  };

  img.src = currentQRDataUrl;
}

function shareViaWhatsApp() {
  const text = encodeURIComponent(
    `Salam, berikut adalah Kad Pengesahan Digital PERDASAMA (27 Tahun: 1998 - 2025) bagi Ts. Hj Nor Azhar Bin Abdul Hamid (MBA) (HE) (BCM) - Ahli Lembaga Penasihat PERDASAMA Kebangsaan:\n${window.location.origin || 'http://65.75.201.219:3000'}/#PDS-HQ-1998-0057\nHubungi: +6017-5050057`
  );
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

// Bottom Tab Navigation
function initTabs() {
  const navLinks = document.querySelectorAll('nav a[data-path]');
  const tabPanes = document.querySelectorAll('.tab-pane');

  const pathToTab = {
    'executive-overview': 'tab-overview',
    'pipeline-deals': 'tab-directory',
    'accounts-contacts': 'tab-membership',
    'agenda-tasks': 'tab-agenda'
  };

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const path = link.getAttribute('data-path');
      const targetTabId = pathToTab[path];

      // Update Nav state
      navLinks.forEach(nl => {
        nl.classList.remove('text-corp-blue', 'font-bold');
        nl.classList.add('text-slate-400');
        nl.removeAttribute('aria-current');
      });

      link.classList.remove('text-slate-400');
      link.classList.add('text-corp-blue', 'font-bold');
      link.setAttribute('aria-current', 'page');

      // Update Tab Pane visibility
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === targetTabId) {
          pane.classList.add('active');
        }
      });

      // Scroll to top of window smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// Modal Helpers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

function initModals() {
  // Bind close buttons for all modals
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      closeModal(modalId);
    });
  });

  // Close when clicking modal backdrop
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        const modal = backdrop.closest('.modal-container');
        if (modal) closeModal(modal.id);
      }
    });
  });

  // Simpan ke Wallet Button
  const btnWallet = document.getElementById('btn-wallet');
  if (btnWallet) {
    btnWallet.addEventListener('click', () => openModal('modal-wallet'));
  }

  // Imbas QR Button
  const btnScanQR = document.getElementById('btn-scan-qr');
  if (btnScanQR) {
    btnScanQR.addEventListener('click', () => {
      openModal('modal-scan-qr');
      startScannerSimulation();
    });
  }

  // Floating Kongsi Kad Digital Button
  const btnShareCard = document.getElementById('btn-share-digital-card');
  if (btnShareCard) {
    btnShareCard.addEventListener('click', () => openModal('modal-share-card'));
  }

  // Tambah Rakan Button
  const btnAddPartner = document.getElementById('btn-add-partner');
  if (btnAddPartner) {
    btnAddPartner.addEventListener('click', () => openModal('modal-add-partner'));
  }

  // Arkib Penuh Activity Button
  const btnFullArchive = document.getElementById('btn-full-archive');
  if (btnFullArchive) {
    btnFullArchive.addEventListener('click', () => openModal('modal-archive'));
  }

  // Concierge & Service Quick Buttons
  const serviceCards = document.querySelectorAll('.service-card-btn');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceName = card.querySelector('span.block.text-xs')?.textContent || 'Perkhidmatan';
      const modalTitle = document.getElementById('concierge-modal-title');
      if (modalTitle) modalTitle.textContent = serviceName;
      openModal('modal-concierge');
    });
  });
}

// Scanner Simulation
let scanTimer = null;
function startScannerSimulation() {
  const scanLine = document.getElementById('scan-line');
  const scanResult = document.getElementById('scan-result');
  if (scanResult) scanResult.classList.add('hidden');
  
  if (scanTimer) clearTimeout(scanTimer);
  scanTimer = setTimeout(() => {
    if (scanResult) {
      scanResult.classList.remove('hidden');
      scanResult.classList.add('flex');
    }
  }, 2200);
}

// Share Actions & vCard Generation
function initShareActions() {
  const btnCopyLink = document.getElementById('btn-copy-card-link');
  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', () => {
      const url = currentVerificationUrl || window.location.href;
      navigator.clipboard?.writeText(url).then(() => {
        showToast('Pautan kad digital berjaya disalin!');
      }).catch(() => {
        showToast('Pautan disalin ke papan klip');
      });
    });
  }

  const btnDownloadVcard = document.getElementById('btn-download-vcard');
  if (btnDownloadVcard) {
    btnDownloadVcard.addEventListener('click', () => {
      const vcardData = `BEGIN:VCARD
VERSION:3.0
N:Abdul Hamid;Nor Azhar;;Ts. Hj;MBA HE BCM
FN:Ts. Hj Nor Azhar Bin Abdul Hamid (MBA) (HE) (BCM)
ORG:PERDASAMA Kebangsaan;Dewan Usahawan Melayu Malaysia
TITLE:Ahli Lembaga Penasihat
TEL;TYPE=CELL,VOICE,PREF:+60175050057
TEL;TYPE=WORK,VOICE:+60327796292
TEL;TYPE=WORK,FAX:+60327796200
EMAIL;TYPE=INTERNET,PREF:azhabdhamid@gmail.com
ADR;TYPE=WORK:;;Level 7, Menara Arina Uniti, Jalan Raja Muda Abdul Aziz;Kuala Lumpur;;50300;Malaysia
URL:https://www.perdasamanasional.org
X-SOCIALPROFILE;TYPE=instagram:https://instagram.com/perdasamanasional
X-SOCIALPROFILE;TYPE=facebook:https://facebook.com/perdasamanasional
X-SOCIALPROFILE;TYPE=youtube:https://youtube.com/@Perdasamanasionaltv
NOTE:27 TAHUN (1998 - 2025) PERDASAMA Mengorak Langkah | Ahli Lembaga Penasihat #PDS-HQ-1998-0057
END:VCARD`;

      const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = "Ts_Hj_Nor_Azhar_PERDASAMA.vcf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Kad kenalan rasmi Ts. Hj Nor Azhar (.vcf) dimuat turun!');
    });
  }

  const btnNfcBeam = document.getElementById('btn-nfc-beam');
  if (btnNfcBeam) {
    btnNfcBeam.addEventListener('click', () => {
      showToast('Sedia untuk pelepasan NFC. Dekatkan peranti anda...', 'info');
    });
  }
}

// Add Partner Form Submission
function initPartnerForm() {
  const form = document.getElementById('form-add-partner');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('partner-name').value.trim();
    const role = document.getElementById('partner-role').value.trim();
    const tag = document.getElementById('partner-tag').value.trim();
    const phone = document.getElementById('partner-phone').value.trim();
    const email = document.getElementById('partner-email').value.trim();

    if (!name || !role) {
      showToast('Sila isi nama dan peranan rakan kongsi', 'error');
      return;
    }

    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, phone, email, tags: [tag || "Rakan Strategik"] })
      });

      const resData = await response.json();
      if (resData.success) {
        showToast(`Rakan kongsi "${name}" berjaya didaftarkan!`);
        appendPartnerToUI(resData.data);
        form.reset();
        closeModal('modal-add-partner');
      } else {
        showToast(resData.message || 'Gagal menambah rakan', 'error');
      }
    } catch (err) {
      // Local fallback if running purely static
      const fallbackPartner = {
        name,
        role,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        tags: [tag || "Rakan Strategik"],
        phone: phone || "+60123456789",
        email: email || "partner@perdasama.org.my"
      };
      appendPartnerToUI(fallbackPartner);
      showToast(`Rakan kongsi "${name}" berjaya didaftarkan!`);
      form.reset();
      closeModal('modal-add-partner');
    }
  });
}

function appendPartnerToUI(partner) {
  const container = document.getElementById('partners-list-container');
  if (!container) return;

  const card = document.createElement('div');
  card.className = "luxury-white-card rounded-xl p-3 flex items-center justify-between gap-3";
  card.innerHTML = `
    <div class="flex items-center gap-3 min-w-0">
      <div class="relative flex-shrink-0">
        <img alt="${partner.name}" class="w-11 h-11 rounded-full object-cover ring-2 ring-blue-300" src="${partner.avatar}"/>
        <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
      </div>
      <div class="flex flex-col min-w-0">
        <span class="text-xs font-bold text-slate-900 truncate">${partner.name}</span>
        <span class="text-slate-500 text-[11px] truncate">${partner.role}</span>
        <div class="flex items-center gap-1.5 mt-1">
          <span class="bg-blue-100 text-corp-blue px-1.5 py-0.2 rounded text-[10px] font-bold">${partner.tags[0] || 'Rakan'}</span>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-1.5 flex-shrink-0">
      <a href="tel:${partner.phone || ''}" aria-label="Hubungi ${partner.name}" class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-blue-50 flex items-center justify-center text-slate-600 hover:text-corp-blue active:scale-95 transition-all border border-slate-200">
        <span class="material-symbols-outlined" style="font-size: 18px;">call</span>
      </a>
      <a href="mailto:${partner.email || ''}" aria-label="Emel ${partner.name}" class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-blue-50 flex items-center justify-center text-slate-600 hover:text-corp-blue active:scale-95 transition-all border border-slate-200">
        <span class="material-symbols-outlined" style="font-size: 18px;">mail</span>
      </a>
    </div>
  `;
  container.appendChild(card);

  // Update badge count
  const badge = document.getElementById('partners-count-badge');
  if (badge) {
    const currentCount = parseInt(badge.textContent || '2', 10);
    badge.textContent = (currentCount + 1).toString();
  }
}

// Directory Search & Filters
function initDirectorySearch() {
  const searchInput = document.getElementById('directory-search-input');
  const clusterFilters = document.querySelectorAll('[data-cluster-filter]');
  const items = document.querySelectorAll('.directory-item');

  function filterDirectory() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const activeBtn = document.querySelector('[data-cluster-filter].bg-corp-blue');
    const selectedCluster = activeBtn ? activeBtn.getAttribute('data-cluster-filter') : 'all';

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const cluster = item.getAttribute('data-cluster') || '';
      
      const matchesQuery = !query || text.includes(query);
      const matchesCluster = selectedCluster === 'all' || cluster.toLowerCase() === selectedCluster.toLowerCase();

      if (matchesQuery && matchesCluster) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterDirectory);
  }

  clusterFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      clusterFilters.forEach(b => {
        b.classList.remove('bg-corp-blue', 'text-white');
        b.classList.add('bg-white', 'text-slate-600');
      });
      btn.classList.remove('bg-white', 'text-slate-600');
      btn.classList.add('bg-corp-blue', 'text-white');
      filterDirectory();
    });
  });
}

// Agenda RSVP Handlers
function initAgendaActions() {
  const rsvpBtns = document.querySelectorAll('.agenda-rsvp-btn');
  rsvpBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-event-title') || 'Acara';
      if (btn.classList.contains('attending')) {
        btn.classList.remove('attending', 'bg-emerald-600', 'text-white');
        btn.classList.add('bg-slate-100', 'text-slate-800');
        btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">how_to_reg</span> RSVP Hadir`;
        showToast(`Pembatalan kehadiran untuk "${title}"`);
      } else {
        btn.classList.add('attending', 'bg-emerald-600', 'text-white');
        btn.classList.remove('bg-slate-100', 'text-slate-800');
        btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">check_circle</span> Disahkan Hadir`;
        showToast(`Kehadiran anda ke "${title}" telah disahkan!`);
      }
    });
  });
}
