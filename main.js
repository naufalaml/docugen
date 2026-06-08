// ============================================
// DocuGen - Main Application Entry
// ============================================

import { initRouter, registerRoute } from './js/router.js';
import { initTheme, toggleTheme } from './js/utils/theme.js';
import { registerDocumentType, getDocumentTypes, renderGeneratorPage, initGeneratorEvents } from './js/generator.js';

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
// Landing Page
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

    <!-- Adsterra Native Banner - Between Hero & Documents -->
    <div class="adsterra-native" id="adsterra-native-1">
      <!-- PASTE KODE NATIVE BANNER ADSTERRA 300x250 atau 728x90 DI SINI -->
      <div class="ad-slot ad-slot-banner"><span class="ad-label">Adsterra Ad Space</span></div>
    </div>

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

    <!-- Adsterra Native Banner - Between Steps & Premium -->
    <div class="adsterra-native" id="adsterra-native-2">
      <!-- PASTE KODE NATIVE BANNER ADSTERRA 300x250 DI SINI -->
      <div class="ad-slot ad-slot-banner"><span class="ad-label">Adsterra Ad Space</span></div>
    </div>

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
            <span class="badge badge-pro">PRO</span>
            <h2>Template Premium</h2>
            <p>Dapatkan akses ke template eksklusif dengan desain lebih profesional dan elegan.</p>
            <button class="btn btn-premium" onclick="alert('Fitur premium coming soon! 🚀')">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              Lihat Template Premium
            </button>
          </div>
          <div class="premium-decoration"><div class="floating-doc"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg></div></div>
        </div>
      </div>
    </section>

    <section class="section section-alt" id="partners">
      <div class="container">
        <h2 class="section-title"><span class="gradient-text">Rekomendasi Untuk Kamu</span></h2>
        <p class="section-subtitle">Layanan terpercaya untuk mendukung karir dan kebutuhan dokumenmu</p>
        <div class="affiliate-grid">
          <div class="affiliate-card glass">
            <div class="affiliate-icon" style="background: linear-gradient(135deg, #06b6d4, #0891b2);"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg></div>
            <h3>Jasa Cetak Dokumen</h3>
            <p>Cetak dokumen berkualitas tinggi dengan harga terjangkau.</p>
            <a href="#" class="btn btn-ghost btn-sm">Kunjungi →</a>
          </div>
          <div class="affiliate-card glass">
            <div class="affiliate-icon" style="background: linear-gradient(135deg, #7c3aed, #6366f1);"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg></div>
            <h3>Platform Rekrutmen</h3>
            <p>Temukan lowongan kerja impianmu di platform terpercaya.</p>
            <a href="#" class="btn btn-ghost btn-sm">Kunjungi →</a>
          </div>
          <div class="affiliate-card glass">
            <div class="affiliate-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706);"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 10 3 12 0v-5"/></svg></div>
            <h3>Kursus Online</h3>
            <p>Tingkatkan skill dengan kursus online bersertifikat.</p>
            <a href="#" class="btn btn-ghost btn-sm">Kunjungi →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Adsterra Native Banner - Bottom -->
    <div class="adsterra-native" id="adsterra-native-3">
      <!-- PASTE KODE NATIVE BANNER ADSTERRA 728x90 DI SINI -->
      <div class="ad-slot ad-slot-banner"><span class="ad-label">Adsterra Ad Space</span></div>
    </div>

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
            <summary class="faq-question">Apa itu template premium?</summary>
            <p class="faq-answer">Template premium adalah desain eksklusif dengan tampilan lebih profesional dan elegan. Fitur ini coming soon!</p>
          </details>
        </div>
      </div>
    </section>
  `;
  observeAnimations();
}

// ============================================
// Generator Page
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
// Init
// ============================================
function initApp() {
  initTheme();

  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

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

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  registerRoute('/', handleHomeRoute);
  registerRoute('/generator/:type', handleGeneratorRoute);
  initRouter();

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link && !link.getAttribute('href').startsWith('#/')) {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
