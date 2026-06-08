// ============================================
// DocuGen - Generator Page Logic
// Handles form rendering, live preview, and PDF download
// ============================================

import { saveDraft, loadDraft, clearDraft } from './utils/storage.js';
import { downloadPDF, formatFilename } from './pdf.js';
import { saveDraftCloud, getCurrentUser } from './utils/auth.js';

// Document type registry - will be populated by template imports
const documentTypes = {};

export function registerDocumentType(type, config) {
  documentTypes[type] = config;
}

// Get document type metadata for landing page
export function getDocumentTypes() {
  return {
    'surat-lamaran': {
      title: 'Surat Lamaran Kerja',
      description: 'Buat surat lamaran profesional yang menarik perhatian HRD',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>`,
      color: '#7c3aed',
    },
    'cv-ats': {
      title: 'CV ATS-Friendly',
      description: 'CV yang lolos sistem ATS dan tampil profesional',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      color: '#06b6d4',
    },
    'surat-resign': {
      title: 'Surat Pengunduran Diri',
      description: 'Resign dengan profesional dan sopan',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/><rect width="20" height="20" x="2" y="2" rx="2"/></svg>`,
      color: '#f43f5e',
    },
    'surat-izin': {
      title: 'Surat Izin',
      description: 'Surat izin kerja, sekolah, atau instansi lainnya',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>`,
      color: '#10b981',
    },
    'surat-kuasa': {
      title: 'Surat Kuasa',
      description: 'Surat kuasa resmi untuk berbagai keperluan',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`,
      color: '#f59e0b',
    },
  };
}

// Debounce utility
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Current state
let currentType = null;
let currentTemplate = 'default';
let repeatableCounters = {};

/**
 * Render the generator page
 */
export function renderGeneratorPage(type) {
  currentType = type;
  const docConfig = documentTypes[type];
  
  if (!docConfig) {
    return `<div class="error-state">
      <h2>Dokumen tidak ditemukan</h2>
      <p>Tipe dokumen "${type}" tidak tersedia.</p>
      <a href="#/" class="btn btn-primary">Kembali ke Beranda</a>
    </div>`;
  }

  const meta = getDocumentTypes()[type];
  const draft = loadDraft(type) || {};
  repeatableCounters = {};

  // Count existing repeatable fields from draft
  docConfig.formFields.forEach(field => {
    if (field.repeatable) {
      const existing = Object.keys(draft).filter(k => k.startsWith(field.repeatGroup + '_'));
      const indices = [...new Set(existing.map(k => parseInt(k.split('_')[1])))].filter(n => !isNaN(n));
      repeatableCounters[field.repeatGroup] = indices.length > 0 ? Math.max(...indices) + 1 : 1;
    }
  });

  return `
    <div class="generator-page">
      <div class="generator-header">
        <a href="#/" class="back-link" id="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Kembali
        </a>
        <h1 class="generator-title">
          <span class="generator-icon" style="color: ${meta.color}">${meta.icon}</span>
          ${meta.title}
        </h1>
      </div>
      
      <div class="template-switcher" id="template-switcher">
        ${renderTemplateSwitcher(docConfig.templateOptions)}
      </div>

      <!-- Mobile Sticky Tabs -->
      <div class="mobile-tabs-container">
        <button class="mobile-tab-btn active" data-tab="form">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          Isi Data
        </button>
        <button class="mobile-tab-btn" data-tab="preview">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          Lihat PDF
        </button>
      </div>

      <div class="generator-layout" data-active-tab="form">
        <div class="form-panel glass" id="form-panel">
          <div class="form-panel-header">
            <h2>Isi Data</h2>
            <div class="form-actions">
              <button class="btn btn-ghost btn-sm" id="btn-clear" title="Hapus semua data">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                Hapus
              </button>
            </div>
          </div>
          <form id="doc-form" class="doc-form">
            ${renderFormFields(docConfig.formFields, draft)}
          </form>
        </div>

        <div class="preview-panel" id="preview-panel">
          <div class="preview-toolbar">
            <span class="preview-label">Preview Dokumen</span>
            <div class="preview-actions">
              <button class="btn btn-primary btn-download" id="btn-download">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                Download PDF
              </button>
              <a href="https://www.effectivecpmnetwork.com/gr2g1u1ky?key=a8a6dcf3f3e57f97a52a35ca072aed37" target="_blank" rel="noopener" class="btn btn-ghost btn-sm" style="display: inline-flex; align-items: center; gap: var(--space-xs); border: 1px solid var(--glass-border); padding: 0 var(--space-md); border-radius: var(--radius-md); text-decoration: none; color: var(--text-secondary); font-size: var(--text-sm); font-weight: 500; height: 38px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="10 9 15 14 20 9"/><line x1="15" x2="15" y1="14" y2="3"/></svg>
                Server Cadangan
              </a>
            </div>
          </div>
          <div class="preview-scroll">
            <div class="a4-paper" id="a4-paper">
              ${docConfig.generateHTML(draft, currentTemplate)}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Ad slot -->
      <div class="ad-slot ad-slot-generator">
        <span class="ad-label">Advertisement</span>
      </div>
    </div>
  `;
}

function renderTemplateSwitcher(templates) {
  if (!templates || templates.length === 0) return '';
  
  return templates.map(t => {
    return `
      <button class="template-option ${t.id === currentTemplate ? 'active' : ''}"
              data-template="${t.id}">
        <span class="template-name">${t.name}</span>
      </button>
    `;
  }).join('');
}

function renderFormFields(fields, data = {}) {
  let html = '';
  let currentSection = '';
  
  fields.forEach(field => {
    // Section header
    if (field.section && field.section !== currentSection) {
      if (currentSection) html += '</div>'; // Close previous section
      currentSection = field.section;
      html += `<div class="form-section">
        <h3 class="form-section-title">${currentSection}</h3>`;
    }

    if (field.repeatable) {
      html += renderRepeatableGroup(field, data);
      return;
    }

    const value = data[field.name] || '';
    const halfClass = field.half ? 'field-half' : '';

    html += `<div class="form-group ${halfClass}">`;
    html += `<label class="form-label" for="${field.name}">${field.label}${field.required ? ' <span class="required">*</span>' : ''}</label>`;
    
    switch (field.type) {
      case 'textarea':
        html += `<textarea class="form-textarea" id="${field.name}" name="${field.name}" 
                  placeholder="${field.placeholder || ''}" rows="${field.rows || 4}"
                  ${field.required ? 'required' : ''}>${value}</textarea>`;
        break;
      case 'select':
        html += `<select class="form-select" id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
          <option value="">-- Pilih --</option>
          ${(field.options || []).map(opt => 
            `<option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>`
          ).join('')}
        </select>`;
        break;
      default:
        html += `<input class="form-input" type="${field.type || 'text'}" id="${field.name}" name="${field.name}"
                  placeholder="${field.placeholder || ''}" value="${value}"
                  ${field.required ? 'required' : ''} />`;
    }
    
    html += '</div>';
  });
  
  if (currentSection) html += '</div>'; // Close last section
  return html;
}

function renderRepeatableGroup(field, data) {
  const group = field.repeatGroup;
  const count = repeatableCounters[group] || 1;
  let html = `<div class="repeatable-group" data-group="${group}">
    <div class="repeatable-header">
      <h4>${field.section || group}</h4>
      <button type="button" class="btn btn-ghost btn-sm btn-add-repeat" data-group="${group}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
        Tambah
      </button>
    </div>
    <div class="repeatable-items" id="repeat-${group}">`;

  for (let i = 0; i < count; i++) {
    html += renderRepeatableItem(field.repeatFields, group, i, data);
  }

  html += '</div></div>';
  return html;
}

function renderRepeatableItem(fields, group, index, data) {
  let html = `<div class="repeatable-item" data-index="${index}">
    <div class="repeatable-item-header">
      <span class="repeatable-index">#${index + 1}</span>
      ${index > 0 ? `<button type="button" class="btn-remove-repeat" data-group="${group}" data-index="${index}">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
      </button>` : ''}
    </div>
    <div class="repeatable-fields">`;

  fields.forEach(f => {
    const fieldName = `${group}_${index}_${f.name}`;
    const value = data[fieldName] || '';
    const halfClass = f.half ? 'field-half' : '';

    html += `<div class="form-group ${halfClass}">`;
    html += `<label class="form-label" for="${fieldName}">${f.label}</label>`;
    
    if (f.type === 'textarea') {
      html += `<textarea class="form-textarea" id="${fieldName}" name="${fieldName}" 
                placeholder="${f.placeholder || ''}" rows="${f.rows || 3}">${value}</textarea>`;
    } else if (f.type === 'select') {
      html += `<select class="form-select" id="${fieldName}" name="${fieldName}">
        <option value="">-- Pilih --</option>
        ${(f.options || []).map(opt => `<option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>`).join('')}
      </select>`;
    } else {
      html += `<input class="form-input" type="${f.type || 'text'}" id="${fieldName}" name="${fieldName}"
                placeholder="${f.placeholder || ''}" value="${value}" />`;
    }
    html += '</div>';
  });

  html += '</div></div>';
  return html;
}

/**
 * Initialize generator page event listeners
 */
export function initGeneratorEvents() {
  const form = document.getElementById('doc-form');
  const preview = document.getElementById('a4-paper');
  const btnDownload = document.getElementById('btn-download');
  const btnClear = document.getElementById('btn-clear');
  const templateSwitcher = document.getElementById('template-switcher');

  if (!form || !preview) return;

  const docConfig = documentTypes[currentType];
  if (!docConfig) return;

  // Live preview update with debounce
  const updatePreview = debounce(() => {
    const data = getFormData();
    saveDraft(currentType, data);
    saveDraftCloud(currentType, data); // Cloud synchronization
    preview.innerHTML = docConfig.generateHTML(data, currentTemplate);
  }, 250);

  form.addEventListener('input', updatePreview);
  form.addEventListener('change', updatePreview);

  // Template switcher
  if (templateSwitcher) {
    templateSwitcher.addEventListener('click', (e) => {
      const btn = e.target.closest('.template-option');
      if (!btn) return;
      
      currentTemplate = btn.dataset.template;
      document.querySelectorAll('.template-option').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updatePreview();
    });
  }

  // Mobile Sticky Tabs Switcher logic
  const layout = document.querySelector('.generator-layout');
  const tabBtns = document.querySelectorAll('.mobile-tab-btn');
  if (layout && tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        layout.setAttribute('data-active-tab', tab);
        tabBtns.forEach(b => b.classList.toggle('active', b === btn));
        
        if (tab === 'preview') {
          // Force preview content update
          const data = getFormData();
          preview.innerHTML = docConfig.generateHTML(data, currentTemplate);
        }
      });
    });
  }

  // Download PDF
  if (btnDownload) {
    btnDownload.addEventListener('click', async () => {
      const data = getFormData();
      const filename = formatFilename(currentType, data.nama || data.nama_lengkap || '');
      
      btnDownload.disabled = true;
      btnDownload.innerHTML = `
        <svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        Generating PDF...
      `;
      
      try {
        await downloadPDF(preview, filename);
        showToast('PDF berhasil didownload! 🎉', 'success');
      } catch (err) {
        showToast('Gagal generate PDF. Coba lagi.', 'error');
      } finally {
        btnDownload.disabled = false;
        btnDownload.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          Download PDF
        `;
      }
    });
  }

  // Clear form
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (confirm('Hapus semua data yang sudah diisi?')) {
        clearDraft(currentType);
        repeatableCounters = {};
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = renderGeneratorPage(currentType);
        initGeneratorEvents();
      }
    });
  }

  // Add repeatable item
  form.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.btn-add-repeat');
    if (addBtn) {
      e.preventDefault();
      const group = addBtn.dataset.group;
      const container = document.getElementById(`repeat-${group}`);
      const docConfig = documentTypes[currentType];
      
      if (!container || !docConfig) return;
      
      const field = docConfig.formFields.find(f => f.repeatGroup === group);
      if (!field) return;

      const index = repeatableCounters[group] || 1;
      repeatableCounters[group] = index + 1;
      
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = renderRepeatableItem(field.repeatFields, group, index, {});
      const newItem = tempDiv.firstElementChild;
      newItem.classList.add('fade-in');
      container.appendChild(newItem);
    }

    const removeBtn = e.target.closest('.btn-remove-repeat');
    if (removeBtn) {
      e.preventDefault();
      const item = removeBtn.closest('.repeatable-item');
      if (item) {
        item.classList.add('fade-out');
        setTimeout(() => {
          item.remove();
          updatePreview();
        }, 300);
      }
    }
  });
}

function getFormData() {
  const form = document.getElementById('doc-form');
  if (!form) return {};
  
  const formData = new FormData(form);
  const data = {};
  
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  return data;
}

/**
 * Show toast notification
 */
export function showToast(message, type = 'success') {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✓' : '✕'}</span>
    <span class="toast-message">${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  // Trigger animation
  requestAnimationFrame(() => toast.classList.add('toast-show'));
  
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
