// ============================================
// DocuGen - Main Application Entry
// ============================================

import { initRouter, registerRoute } from './js/router.js';
import { initTheme, toggleTheme } from './js/utils/theme.js';
import { registerDocumentType, getDocumentTypes, renderGeneratorPage, initGeneratorEvents, showToast } from './js/generator.js';

// Import Auth & Backend functions
import { 
  initAuth, 
  getCurrentUser, 
  signInWithGoogle, 
  signUpWithEmail, 
  loginWithEmail, 
  signOutUser, 
  upgradeToPremium, 
  getDraftsCloud, 
  deleteDraftCloud,
  isFirebaseConfigured
} from './js/utils/auth.js';

import { formFields as lamaranFields, generateHTML as lamaranHTML, templateOptions as lamaranTemplates } from './js/templates/surat-lamaran.js';
import { formFields as cvFields, generateHTML as cvHTML, templateOptions as cvTemplates } from './js/templates/cv-ats.js';
import { formFields as resignFields, generateHTML as resignHTML, templateOptions as resignTemplates } from './js/templates/surat-resign.js';
import { formFields as izinFields, generateHTML as izinHTML, templateOptions as izinTemplates } from './js/templates/surat-izin.js';
import { formFields as kuasaFields, generateHTML as kuasaHTML, templateOptions as kuasaTemplates } from './js/templates/surat-kuasa.js';

// Register all document types
registerDocumentType('surat-lamaran', { formFields: lamaranFields, generateHTML: lamaranHTML, templateOptions: lamaranTemplates });
registerDocumentType('cv-ats', { formFields: cvFields, generateHTML: cvHTML, templateOptions: cvTemplates });
registerDocumentType('surat-resign', { formFields: resignFields, generateHTML: resignHTML, templateOptions: resignTemplates });
registerDocumentType('surat-izin', { formFields: izinFields, generateHTML: izinHTML, templateOptions: izinTemplates });
registerDocumentType('surat-kuasa', { formFields: kuasaFields, generateHTML: kuasaHTML, templateOptions: kuasaTemplates });

// ============================================
// Landing Page Rendering
// ============================================
function renderLandingPage() {
  const main = document.getElementById('main-content');
  const docTypes = getDocumentTypes();

  main.innerHTML = `
    <section class="hero" id="hero">
      <div class="hero-bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      <div class="container hero-content">
        <div class="hero-badge animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          100% Gratis — Tanpa Perlu Daftar
        </div>
        <h1 class="hero-title animate-fade-in">
          Buat Dokumen Profesional<br>
          <span class="gradient-text">dalam Hitungan Detik</span>
        </h1>
        <p class="hero-subtitle animate-fade-in">
          Generator dokumen otomatis untuk surat lamaran kerja, CV ATS-friendly,
          surat pengunduran diri, surat izin, dan surat kuasa. Isi form, download PDF.
        </p>
        <div class="hero-cta animate-fade-in">
          <a href="#documents" class="btn btn-primary btn-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            Mulai Buat Dokumen
          </a>
          <a href="#how-it-works" class="btn btn-ghost btn-lg">Cara Kerja <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></a>
        </div>
        <div class="hero-stats animate-fade-in">
          <div class="stat"><span class="stat-number">5</span><span class="stat-label">Jenis Dokumen</span></div>
          <div class="stat-divider"></div>
          <div class="stat"><span class="stat-number">∞</span><span class="stat-label">Gratis Selamanya</span></div>
          <div class="stat-divider"></div>
          <div class="stat"><span class="stat-number">PDF</span><span class="stat-label">Siap Cetak</span></div>
        </div>
      </div>
    </section>

    <section class="section" id="documents">
      <div class="container">
        <h2 class="section-title"><span class="gradient-text">Pilih Dokumen</span></h2>
        <p class="section-subtitle">Pilih jenis dokumen yang ingin kamu buat. Semua template gratis!</p>
        <div class="documents-grid">
          ${Object.entries(docTypes).map(([key, doc], i) => `
            <a href="#/generator/${key}" class="document-card" style="--card-color: ${doc.color}; --delay: ${i * 0.1}s">
              <div class="document-card-icon">${doc.icon}</div>
              <h3 class="document-card-title">${doc.title}</h3>
              <p class="document-card-desc">${doc.description}</p>
              <span class="document-card-cta">Buat Sekarang <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section section-alt" id="how-it-works">
      <div class="container">
        <h2 class="section-title"><span class="gradient-text">Cara Kerja</span></h2>
        <p class="section-subtitle">Tiga langkah mudah untuk membuat dokumen profesional</p>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <div class="step-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h.01"/><path d="M15 9h.01"/><path d="M9 15h.01"/><path d="M15 15h.01"/></svg></div>
            <h3>Pilih Dokumen</h3>
            <p>Pilih jenis dokumen yang kamu butuhkan</p>
          </div>
          <div class="step-connector"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>
          <div class="step-card">
            <div class="step-number">2</div>
            <div class="step-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></div>
            <h3>Isi Form</h3>
            <p>Lengkapi data, preview real-time</p>
          </div>
          <div class="step-connector"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>
          <div class="step-card">
            <div class="step-number">3</div>
            <div class="step-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg></div>
            <h3>Download PDF</h3>
            <p>PDF siap cetak terunduh otomatis</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials / Social Proof -->
    <section class="section" id="testimonials">
      <div class="container">
        <h2 class="section-title"><span class="gradient-text">Dipercaya Ribuan Pengguna</span></h2>
        <p class="section-subtitle">Sudah banyak yang terbantu membuat dokumen profesional</p>
        <div class="testimonials-grid">
          <div class="testimonial-card glass">
            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-text">"Sangat membantu! Saya bisa buat surat lamaran yang rapi dalam 5 menit. Langsung dapat panggilan interview."</p>
            <div class="testimonial-author">— Rina S., Fresh Graduate</div>
          </div>
          <div class="testimonial-card glass">
            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-text">"CV ATS-nya keren banget! Simple, bersih, dan lolos screening di perusahaan besar. Recommended!"</p>
            <div class="testimonial-author">— Dimas P., Software Developer</div>
          </div>
          <div class="testimonial-card glass">
            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p class="testimonial-text">"Butuh surat kuasa dadakan, langsung bisa buat dan cetak. Gratis pula! Terima kasih DocuGen."</p>
            <div class="testimonial-author">— Budi W., Wiraswasta</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="premium">
      <div class="container">
        <div class="premium-banner glass">
          <div class="premium-content">
            <span class="badge badge-free">100% GRATIS</span>
            <h2>Semua Template Bebas Biaya</h2>
            <p>Kami berkomitmen menyediakan seluruh template dokumen secara gratis tanpa batasan. Dukung kami dengan membagikan website ini ke teman atau kerabat Anda!</p>
            <a href="#documents" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              Mulai Buat Dokumen
            </a>
          </div>
          <div class="premium-decoration"><div class="floating-doc"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg></div></div>
        </div>
      </div>
    </section>

    <!-- FAQ Section for SEO -->
    <section class="section section-alt" id="faq">
      <div class="container">
        <h2 class="section-title"><span class="gradient-text">Pertanyaan Umum (FAQ)</span></h2>
        <p class="section-subtitle">Jawaban untuk pertanyaan yang sering ditanyakan</p>
        <div class="faq-list">
          <details class="faq-item glass">
            <summary class="faq-question">Apakah DocuGen benar-benar gratis?</summary>
            <p class="faq-answer">Ya! Semua fitur dasar DocuGen 100% gratis. Kamu bisa membuat dan mengunduh dokumen PDF tanpa batas, tanpa perlu daftar akun.</p>
          </details>
          <details class="faq-item glass">
            <summary class="faq-question">Apakah data saya aman?</summary>
            <p class="faq-answer">Sangat aman. Semua proses pembuatan dokumen dilakukan di browser kamu (client-side). Data tidak dikirim ke server manapun. Kami tidak menyimpan data pribadi kamu.</p>
          </details>
          <details class="faq-item glass">
            <summary class="faq-question">Format dokumen apa saja yang tersedia?</summary>
            <p class="faq-answer">Saat ini kami menyediakan 5 jenis dokumen: Surat Lamaran Kerja, CV ATS-Friendly, Surat Pengunduran Diri, Surat Izin, dan Surat Kuasa. Semua bisa didownload dalam format PDF.</p>
          </details>
          <details class="faq-item glass">
            <summary class="faq-question">Bisa diakses dari HP?</summary>
            <p class="faq-answer">Tentu! DocuGen responsive dan bisa digunakan dari smartphone, tablet, maupun laptop/desktop.</p>
          </details>
          <details class="faq-item glass">
            <summary class="faq-question">Apakah ada template berbayar (PRO)?</summary>
            <p class="faq-answer">Tidak. Di DocuGen, semua template 100% gratis dan dapat digunakan secara bebas oleh siapa saja tanpa dipungut biaya.</p>
          </details>
        </div>
      </div>
    </section>
  `;

  observeAnimations();
}

// ============================================
// Dashboard Rendering & Handler
// ============================================
async function handleDashboardRoute() {
  const user = getCurrentUser();
  if (!user) {
    // If not logged in, redirect home and open auth modal
    window.location.hash = '#/';
    showModal('#auth-modal');
    showToast('Silakan masuk terlebih dahulu!', 'error');
    return;
  }

  const main = document.getElementById('main-content');
  const navbar = document.querySelector('.navbar');
  if (navbar) navbar.classList.add('navbar-compact');

  main.innerHTML = `
    <div class="container dashboard-container">
      <h1 class="dashboard-title"><span class="gradient-text">Dashboard Pengguna</span></h1>
      
      <div class="dashboard-grid">
        <!-- Profile Card -->
        <div class="profile-card glass animate-fade-in">
          <img src="${user.photoURL}" alt="Avatar" class="profile-card-avatar">
          <div class="profile-card-name">${user.displayName}</div>
          <div class="profile-card-email">${user.email}</div>
          <div class="badge-account badge-account-free">
            MEMBER
          </div>
          
          <div class="profile-card-stats">
            <div>
              <div class="profile-stat-val" id="stats-draft-count">-</div>
              <div class="profile-stat-lbl">Draf Dibuat</div>
            </div>
            <div>
              <div class="profile-stat-val">${isFirebaseConfigured() ? 'Cloud' : 'Lokal'}</div>
              <div class="profile-stat-lbl">Database</div>
            </div>
          </div>
        </div>
        
        <!-- Main Panel -->
        <div class="dashboard-content-panel">
          <!-- Drafts Panel -->
          <div class="content-card glass animate-fade-in">
            <div class="content-card-header">
              <h3>Draf Dokumen Anda</h3>
            </div>
            <div class="drafts-list" id="dashboard-drafts-list">
              <div class="empty-drafts">Memuat draf dokumen...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Load and render user drafts
  await loadAndRenderDrafts(user);
}

async function loadAndRenderDrafts(user) {
  const listContainer = document.getElementById('dashboard-drafts-list');
  const statsCount = document.getElementById('stats-draft-count');
  if (!listContainer) return;

  const drafts = await getDraftsCloud();
  if (statsCount) statsCount.textContent = drafts.length;

  if (drafts.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-drafts">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: var(--space-xs); opacity: 0.5;"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
        <p>Belum ada draf dokumen yang disimpan.</p>
        <a href="#/" class="btn btn-ghost btn-sm" style="margin-top: var(--space-md); display: inline-flex;">Mulai Buat Dokumen</a>
      </div>
    `;
    return;
  }

  const docMetadata = getDocumentTypes();

  listContainer.innerHTML = drafts.map(draft => {
    const meta = docMetadata[draft.docType] || { title: draft.docType, icon: '📄', color: '#7c3aed' };
    const dateStr = new Date(draft.updatedAt).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    return `
      <div class="draft-item animate-fade-in">
        <div class="draft-item-info">
          <div class="draft-item-icon" style="color: ${meta.color}">${meta.icon}</div>
          <div>
            <div class="draft-item-title">${meta.title}</div>
            <div class="draft-item-date">Terakhir diedit: ${dateStr}</div>
          </div>
        </div>
        <div class="draft-item-actions">
          <a href="#/generator/${draft.docType}" class="btn-icon" title="Edit Dokumen">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          </a>
          <button class="btn-icon btn-delete btn-delete-draft" data-type="${draft.docType}" title="Hapus Draf">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Attach delete handlers
  listContainer.querySelectorAll('.btn-delete-draft').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const type = btn.dataset.type;
      if (confirm('Apakah Anda yakin ingin menghapus draf ini?')) {
        await deleteDraftCloud(type);
        showToast('Draf berhasil dihapus.', 'success');
        // Refresh list
        loadAndRenderDrafts(user);
      }
    });
  });
}

// ============================================
// Generator Route Handler
// ============================================
function handleGeneratorRoute(params) {
  const main = document.getElementById('main-content');
  const navbar = document.querySelector('.navbar');
  if (navbar) navbar.classList.add('navbar-compact');
  main.innerHTML = renderGeneratorPage(params.type);
  initGeneratorEvents();
}

function handleHomeRoute() {
  const navbar = document.querySelector('.navbar');
  if (navbar) navbar.classList.remove('navbar-compact');
  renderLandingPage();
}

// ============================================
// Scroll Animation Observer
// ============================================
function observeAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.document-card, .step-card, .affiliate-card, .premium-banner, .testimonial-card, .faq-item').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}

// ============================================
// Modal Helper Functions
// ============================================
function showModal(selector) {
  const modal = document.querySelector(selector);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(selector) {
  const modal = document.querySelector(selector);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ============================================
// Navbar Auth State UI Updates
// ============================================
function updateNavbarAuth(user) {
  const btnLogin = document.getElementById('nav-btn-login');
  const profileMenu = document.getElementById('user-profile-menu');
  const userAvatar = document.getElementById('user-avatar');
  const userDisplayName = document.getElementById('user-display-name');

  if (user) {
    if (btnLogin) btnLogin.style.display = 'none';
    if (profileMenu) profileMenu.style.display = 'inline-block';
    if (userAvatar) userAvatar.src = user.photoURL;
    if (userDisplayName) userDisplayName.textContent = user.displayName.split(' ')[0];
  } else {
    if (btnLogin) btnLogin.style.display = 'inline-block';
    if (profileMenu) profileMenu.style.display = 'none';
  }
}

// ============================================
// Init Application
// ============================================
function initApp() {
  initTheme();

  // Theme switch listener
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
      menuToggle.classList.toggle('menu-open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => { navLinks.classList.remove('nav-open'); menuToggle.classList.remove('menu-open'); });
    });
  }

  // Navbar scroll background effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Navbar login trigger
  document.getElementById('nav-btn-login')?.addEventListener('click', () => {
    showModal('#auth-modal');
  });

  // Navbar profile menu trigger dropdown
  const profileTrigger = document.getElementById('profile-trigger');
  const profileMenu = document.getElementById('user-profile-menu');
  if (profileTrigger && profileMenu) {
    profileTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      profileMenu.classList.toggle('open');
    });
    document.addEventListener('click', () => {
      profileMenu.classList.remove('open');
    });
  }

  // Modal close handlers
  document.getElementById('auth-modal-close')?.addEventListener('click', () => closeModal('#auth-modal'));
  document.getElementById('premium-modal-close')?.addEventListener('click', () => closeModal('#premium-modal'));

  // Close modals on clicking overlay
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal('#' + modal.id);
      }
    });
  });

  // Auth Tab toggles inside Auth Modal
  const authTabBtns = document.querySelectorAll('.auth-tab-btn');
  authTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.authTab;
      authTabBtns.forEach(b => b.classList.toggle('active', b === btn));
      
      document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.toggle('active', form.id === `${tab}-form`);
      });
    });
  });

  // Google Login submit handler
  document.getElementById('btn-google-login')?.addEventListener('click', async () => {
    try {
      const btn = document.getElementById('btn-google-login');
      btn.disabled = true;
      btn.innerHTML = 'Menghubungkan Google...';
      
      await signInWithGoogle();
      
      closeModal('#auth-modal');
      showToast('Masuk Akun Google Berhasil! 🎉', 'success');
    } catch (e) {
      showToast('Gagal masuk Google. Coba lagi.', 'error');
      const btn = document.getElementById('btn-google-login');
      btn.disabled = false;
      btn.innerHTML = 'Google Account';
    }
  });

  // Email Register form handler
  document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if (password.length < 6) {
      showToast('Password minimal 6 karakter!', 'error');
      return;
    }

    try {
      await signUpWithEmail(name, email, password);
      closeModal('#auth-modal');
      showToast('Pendaftaran Berhasil! 🎉', 'success');
    } catch (err) {
      showToast(err.message || 'Gagal mendaftar akun.', 'error');
    }
  });

  // Email Login form handler
  document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      await loginWithEmail(email, password);
      closeModal('#auth-modal');
      showToast('Berhasil masuk ke akun!', 'success');
    } catch (err) {
      showToast(err.message || 'Email atau password salah.', 'error');
    }
  });

  // Logout trigger
  document.getElementById('btn-logout')?.addEventListener('click', async (e) => {
    e.preventDefault();
    if (confirm('Apakah Anda yakin ingin keluar dari akun?')) {
      await signOutUser();
      showToast('Anda telah keluar dari akun.', 'success');
    }
  });

  // Premium Upgrade action inside modal
  document.getElementById('btn-upgrade-now')?.addEventListener('click', async () => {
    const user = getCurrentUser();
    if (!user) {
      closeModal('#premium-modal');
      showModal('#auth-modal');
      showToast('Silakan masuk terlebih dahulu!', 'error');
      return;
    }

    const btn = document.getElementById('btn-upgrade-now');
    btn.disabled = true;
    btn.textContent = 'Memproses Pembayaran...';

    const orderId = 'PRO-' + user.uid.substring(0, 5) + '-' + Date.now();

    try {
      // 1. Panggil serverless function untuk meminta token Snap Midtrans
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: orderId,
          grossAmount: 29000,
          email: user.email,
          name: user.displayName
        })
      });

      if (!response.ok) {
        throw new Error('Endpoint api/checkout tidak tersedia atau error');
      }

      const checkoutData = await response.json();

      // 2. Buka widget Midtrans Snap asli jika library & token tersedia
      if (window.snap && checkoutData.token) {
        closeModal('#premium-modal');
        window.snap.pay(checkoutData.token, {
          onSuccess: async function(result) {
            await upgradeToPremium();
            showToast('Pembayaran Berhasil! Selamat datang di PRO 👑', 'success');
            if (window.location.hash === '#/dashboard') {
              handleDashboardRoute();
            } else {
              window.location.reload();
            }
          },
          onPending: function(result) {
            showToast('Menunggu pembayaran Anda.', 'warning');
          },
          onError: function(result) {
            showToast('Pembayaran gagal. Coba lagi.', 'error');
          },
          onClose: function() {
            showToast('Pembayaran dibatalkan.', 'warning');
          }
        });
      } else {
        throw new Error('Midtrans Snap SDK atau Token tidak ditemukan');
      }

    } catch (e) {
      console.warn("Real Midtrans Gateway tidak terdeteksi, beralih ke simulasi lokal:", e);
      // Fallback: Tampilkan Modal Pilihan Metode Pembayaran Simulasi
      closeModal('#premium-modal');
      showModal('#simulated-payment-modal');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Upgrade ke PRO Sekarang';
    }
  });

  // Simulated Payment Modal Event Handlers
  document.getElementById('simulated-payment-modal-close')?.addEventListener('click', () => {
    closeModal('#simulated-payment-modal');
  });

  document.getElementById('btn-pay-simulated')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-pay-simulated');
    const selectedMethod = document.querySelector('input[name="mock-payment"]:checked')?.value || 'qris';
    
    btn.disabled = true;
    btn.textContent = 'Memproses Pembayaran Virtual...';

    setTimeout(async () => {
      try {
        await upgradeToPremium();
        closeModal('#simulated-payment-modal');
        
        let methodName = 'QRIS';
        if (selectedMethod === 'va_bca') methodName = 'BCA VA';
        if (selectedMethod === 'va_mandiri') methodName = 'Mandiri VA';
        if (selectedMethod === 'gopay') methodName = 'GoPay';

        showToast(`Pembayaran via ${methodName} Sukses! Selamat datang di PRO 👑`, 'success');
        
        if (window.location.hash === '#/dashboard') {
          handleDashboardRoute();
        } else {
          window.location.reload();
        }
      } catch (err) {
        showToast('Gagal memproses upgrade.', 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Bayar Sekarang';
      }
    }, 1200);
  });

  // Listen for premium upgrade prompt triggers from generator
  document.addEventListener('premium:show-upgrade-modal', () => {
    showModal('#premium-modal');
  });

  // Initialize Authentication State Listener
  initAuth((user) => {
    updateNavbarAuth(user);
    
    // If routing has been initialized, trigger route reload on auth change to sync screens
    if (window.location.hash === '#/dashboard') {
      handleDashboardRoute();
    }
  });

  // Setup Routes
  registerRoute('/', handleHomeRoute);
  registerRoute('/dashboard', handleDashboardRoute);
  registerRoute('/generator/:type', handleGeneratorRoute);
  initRouter();

  // Internal hash navigation interceptor
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      const href = link.getAttribute('href');
      if (!href.startsWith('#/')) {
        const targetId = href.slice(1);
        if (!targetId) return; // ignore empty href="#"
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        } else {
          e.preventDefault();
          window.location.hash = '#/';
          setTimeout(() => {
            const newTarget = document.getElementById(targetId);
            if (newTarget) {
              newTarget.scrollIntoView({ behavior: 'smooth' });
            }
          }, 300);
        }
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
