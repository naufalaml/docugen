// ============================================
// DocuGen - PDF Generation Module
// Uses html2pdf.js loaded via CDN (window.html2pdf)
// ============================================

const defaultOptions = {
  margin: 0,
  filename: 'dokumen.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: {
    scale: 2,
    useCORS: true,
    letterRendering: true,
    logging: false,
  },
  jsPDF: {
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait',
  },
  pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
};

export async function downloadPDF(element, filename = 'dokumen.pdf', options = {}) {
  const mergedOptions = { ...defaultOptions, ...options, filename };
  try {
    await window.html2pdf().set(mergedOptions).from(element).save();
    document.dispatchEvent(new CustomEvent('pdf:success', { detail: { filename } }));
  } catch (error) {
    console.error('PDF generation failed:', error);
    document.dispatchEvent(new CustomEvent('pdf:error', { detail: { error } }));
    throw error;
  }
}

export function formatFilename(docType, name = '') {
  const typeNames = {
    'surat-lamaran': 'Surat_Lamaran',
    'cv-ats': 'CV',
    'surat-resign': 'Surat_Pengunduran_Diri',
    'surat-izin': 'Surat_Izin',
    'surat-kuasa': 'Surat_Kuasa',
  };
  const base = typeNames[docType] || 'Dokumen';
  const cleanName = name.replace(/[^a-zA-Z\s]/g, '').trim().replace(/\s+/g, '_');
  const date = new Date().toISOString().split('T')[0];
  return cleanName ? `${base}_${cleanName}_${date}.pdf` : `${base}_${date}.pdf`;
}
