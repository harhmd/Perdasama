// PERDASAMA Corporate Platform Client App
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initModals();
  initDirectorySearch();
  initAgendaActions();
  initPartnerForm();
  initShareActions();
});

// Toast notification helper
function showToast(message, type = 'success') {
  const existing = document.getElementById('toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.className = `fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold backdrop-blur-md border toast-slide ${
    type === 'success' 
      ? 'bg-secondary-container/90 text-on-secondary-container border-secondary/40' 
      : 'bg-surface-container-high/90 text-on-surface border-outline-variant/40'
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
        nl.classList.remove('text-tertiary', 'font-bold');
        nl.classList.add('text-on-surface-variant');
        nl.removeAttribute('aria-current');
      });

      link.classList.remove('text-on-surface-variant');
      link.classList.add('text-tertiary', 'font-bold');
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
      const serviceName = card.querySelector('span.block.text-label-md')?.textContent || 'Perkhidmatan';
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
      const url = window.location.href;
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
FN:Dato' Dr. Megat Azlan bin Megat Tariq
ORG:Apex BioVentures Group Sdn Bhd;PERDASAMA Kebangsaan
TITLE:Pengasas & Pengarah Urusan
TEL;TYPE=CELL,VOICE:+60128889922
EMAIL:megat.azlan@apexbio.com.my
URL:https://perdasama.org.my
NOTE:Ahli Seumur Hidup PERDASAMA | Platinum Korporat #PDS-MY-2025-0849
END:VCARD`;

      const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = "Dato_Dr_Megat_Azlan_PERDASAMA.vcf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Kad kenalan vCard (.vcf) dimuat turun!');
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
  card.className = "bg-surface-container rounded-xl p-3 flex items-center justify-between gap-space-sm border border-outline-variant/30";
  card.innerHTML = `
    <div class="flex items-center gap-3 min-w-0">
      <div class="relative flex-shrink-0">
        <img alt="${partner.name}" class="w-11 h-11 rounded-full object-cover ring-2 ring-primary/30" src="${partner.avatar}"/>
        <span class="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full ring-2 ring-surface"></span>
      </div>
      <div class="flex flex-col min-w-0">
        <span class="font-label-lg text-label-lg text-on-surface font-bold truncate">${partner.name}</span>
        <span class="text-on-surface-variant font-body-sm text-[12px] truncate">${partner.role}</span>
        <div class="flex items-center gap-1.5 mt-1">
          <span class="bg-primary/15 text-primary px-1.5 py-0.2 rounded text-[10px] font-bold">${partner.tags[0] || 'Rakan'}</span>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-1.5 flex-shrink-0">
      <a href="tel:${partner.phone || ''}" aria-label="Hubungi ${partner.name}" class="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 transition-all border border-outline-variant/30">
        <span class="material-symbols-outlined" style="font-size: 18px;">call</span>
      </a>
      <a href="mailto:${partner.email || ''}" aria-label="Emel ${partner.name}" class="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 transition-all border border-outline-variant/30">
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
    const activeBtn = document.querySelector('[data-cluster-filter].bg-primary-container');
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
        b.classList.remove('bg-primary-container', 'text-on-primary-container');
        b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
      });
      btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
      btn.classList.add('bg-primary-container', 'text-on-primary-container');
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
        btn.classList.remove('attending', 'bg-secondary', 'text-on-secondary');
        btn.classList.add('bg-surface-container-high', 'text-on-surface');
        btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">how_to_reg</span> RSVP Hadir`;
        showToast(`Pembatalan kehadiran untuk "${title}"`);
      } else {
        btn.classList.add('attending', 'bg-secondary', 'text-on-secondary');
        btn.classList.remove('bg-surface-container-high', 'text-on-surface');
        btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">check_circle</span> Disahkan Hadir`;
        showToast(`Kehadiran anda ke "${title}" telah disahkan!`);
      }
    });
  });
}
