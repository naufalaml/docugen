// ============================================
// DocuGen - CV ATS-Friendly Template
// ============================================

export const templateOptions = [
  { id: 'default', name: 'Clean Minimal', premium: false, description: 'CV bersih dan mudah dibaca ATS' },
  { id: 'professional', name: 'Professional', premium: false, description: 'Dengan border dan aksen warna' },
  { id: 'creative', name: 'Creative Pro', premium: true, description: 'Desain kreatif premium' },
];

export const formFields = [
  // Data Diri
  { name: 'nama_lengkap', label: 'Nama Lengkap', type: 'text', placeholder: 'Budi Santoso', required: true, section: 'Data Diri', half: true },
  { name: 'jabatan_title', label: 'Title / Jabatan', type: 'text', placeholder: 'Software Engineer', required: false, section: 'Data Diri', half: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'email@contoh.com', required: true, section: 'Data Diri', half: true },
  { name: 'telepon', label: 'No. Telepon', type: 'tel', placeholder: '08xxxxxxxxxx', required: true, section: 'Data Diri', half: true },
  { name: 'alamat', label: 'Alamat', type: 'text', placeholder: 'Jakarta, Indonesia', required: false, section: 'Data Diri' },
  { name: 'linkedin', label: 'LinkedIn (opsional)', type: 'text', placeholder: 'linkedin.com/in/username', required: false, section: 'Data Diri', half: true },
  { name: 'website', label: 'Website (opsional)', type: 'text', placeholder: 'www.contoh.com', required: false, section: 'Data Diri', half: true },

  // Ringkasan
  { name: 'ringkasan', label: 'Ringkasan Profil', type: 'textarea', placeholder: 'Profesional berpengalaman di bidang... dengan keahlian dalam...', required: false, section: 'Ringkasan Profil', rows: 4 },

  // Pendidikan
  {
    name: 'pendidikan', section: 'Pendidikan', repeatable: true, repeatGroup: 'pendidikan',
    repeatFields: [
      { name: 'institusi', label: 'Institusi', type: 'text', placeholder: 'Universitas Indonesia', half: true },
      { name: 'jurusan', label: 'Jurusan', type: 'text', placeholder: 'Teknik Informatika', half: true },
      { name: 'jenjang', label: 'Jenjang', type: 'select', options: ['SMA/SMK', 'D3', 'S1', 'S2', 'S3'], half: true },
      { name: 'tahun', label: 'Tahun Lulus', type: 'text', placeholder: '2020', half: true },
    ]
  },

  // Pengalaman
  {
    name: 'pengalaman', section: 'Pengalaman Kerja', repeatable: true, repeatGroup: 'pengalaman',
    repeatFields: [
      { name: 'perusahaan', label: 'Perusahaan', type: 'text', placeholder: 'PT. Contoh Indonesia', half: true },
      { name: 'posisi', label: 'Posisi', type: 'text', placeholder: 'Software Engineer', half: true },
      { name: 'tahun_mulai', label: 'Tahun Mulai', type: 'text', placeholder: '2020', half: true },
      { name: 'tahun_selesai', label: 'Tahun Selesai', type: 'text', placeholder: '2023 / Sekarang', half: true },
      { name: 'deskripsi', label: 'Deskripsi Tugas', type: 'textarea', placeholder: '- Mengembangkan aplikasi web\n- Mengelola database\n- Berkolaborasi dengan tim', rows: 4 },
    ]
  },

  // Keahlian
  { name: 'keahlian', label: 'Keahlian (pisahkan dengan koma)', type: 'textarea', placeholder: 'JavaScript, Python, Project Management, Microsoft Office, Adobe Photoshop', required: false, section: 'Keahlian & Sertifikasi', rows: 3 },
  { name: 'sertifikasi', label: 'Sertifikasi (pisahkan dengan baris baru)', type: 'textarea', placeholder: 'Google Analytics Certified (2023)\nAWS Cloud Practitioner (2022)', required: false, section: 'Keahlian & Sertifikasi', rows: 3 },
];

function getGroupedData(data, prefix) {
  const groups = {};
  Object.keys(data).forEach(key => {
    if (key.startsWith(prefix + '_')) {
      const parts = key.split('_');
      const index = parseInt(parts[1]);
      const field = parts.slice(2).join('_');
      if (!isNaN(index)) {
        if (!groups[index]) groups[index] = {};
        groups[index][field] = data[key];
      }
    }
  });
  return Object.values(groups).filter(g => Object.values(g).some(v => v && v.trim()));
}

export function generateHTML(data, templateId = 'default') {
  const nama = data.nama_lengkap || 'Nama Lengkap';
  const title = data.jabatan_title || '';
  const email = data.email || 'email@contoh.com';
  const telepon = data.telepon || '08xxxxxxxxxx';
  const alamat = data.alamat || '';
  const linkedin = data.linkedin || '';
  const website = data.website || '';
  const ringkasan = data.ringkasan || '';
  const keahlian = data.keahlian || '';
  const sertifikasi = data.sertifikasi || '';

  const pendidikan = getGroupedData(data, 'pendidikan');
  const pengalaman = getGroupedData(data, 'pengalaman');

  const contactParts = [email, telepon, alamat, linkedin, website].filter(Boolean);
  const contactLine = contactParts.join('  |  ');

  const sectionDivider = templateId === 'professional'
    ? '<hr style="border: none; border-top: 2px solid #6366f1; margin: 12px 0;">'
    : '<hr style="border: none; border-top: 1px solid #ccc; margin: 12px 0;">';

  let html = `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 10.5pt; line-height: 1.5; color: #1a1a1a;">`;

  // Header - Name
  if (templateId === 'professional') {
    html += `
      <div style="text-align: center; padding-bottom: 12px; border-bottom: 3px solid #6366f1; margin-bottom: 12px;">
        <h1 style="font-size: 22pt; font-weight: bold; margin: 0; letter-spacing: 2px; font-family: Arial, sans-serif;">${nama.toUpperCase()}</h1>
        ${title ? `<div style="font-size: 11pt; color: #6366f1; margin-top: 4px; font-weight: 500;">${title}</div>` : ''}
        <div style="font-size: 9pt; color: #555; margin-top: 6px;">${contactLine}</div>
      </div>`;
  } else {
    html += `
      <div style="text-align: center; margin-bottom: 12px;">
        <h1 style="font-size: 20pt; font-weight: bold; margin: 0; font-family: Arial, sans-serif;">${nama.toUpperCase()}</h1>
        ${title ? `<div style="font-size: 11pt; color: #444; margin-top: 2px;">${title}</div>` : ''}
        <div style="font-size: 9pt; color: #666; margin-top: 6px;">${contactLine}</div>
      </div>`;
  }

  // Ringkasan
  if (ringkasan) {
    html += sectionDivider;
    html += `<div style="margin-bottom: 4px;">
      <h2 style="font-size: 11pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px 0; font-family: Arial, sans-serif;">RINGKASAN PROFIL</h2>
      <p style="margin: 0; text-align: justify; font-size: 10pt;">${ringkasan}</p>
    </div>`;
  }

  // Pengalaman Kerja
  if (pengalaman.length > 0) {
    html += sectionDivider;
    html += `<div style="margin-bottom: 4px;">
      <h2 style="font-size: 11pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0; font-family: Arial, sans-serif;">PENGALAMAN KERJA</h2>`;
    
    pengalaman.forEach(exp => {
      const periode = [exp.tahun_mulai, exp.tahun_selesai].filter(Boolean).join(' — ');
      html += `
        <div style="margin-bottom: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <strong style="font-size: 10.5pt;">${exp.posisi || 'Posisi'}</strong>
            <span style="font-size: 9pt; color: #666;">${periode}</span>
          </div>
          <div style="font-size: 10pt; color: #444; font-style: italic;">${exp.perusahaan || 'Perusahaan'}</div>
          ${exp.deskripsi ? `<div style="margin-top: 4px; font-size: 10pt; white-space: pre-line;">${exp.deskripsi.split('\n').map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            return trimmed.startsWith('-') ? `• ${trimmed.slice(1).trim()}` : `• ${trimmed}`;
          }).filter(Boolean).join('\n')}</div>` : ''}
        </div>`;
    });
    html += '</div>';
  }

  // Pendidikan
  if (pendidikan.length > 0) {
    html += sectionDivider;
    html += `<div style="margin-bottom: 4px;">
      <h2 style="font-size: 11pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0; font-family: Arial, sans-serif;">PENDIDIKAN</h2>`;
    
    pendidikan.forEach(edu => {
      html += `
        <div style="margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <strong style="font-size: 10.5pt;">${edu.institusi || 'Institusi'}</strong>
            <span style="font-size: 9pt; color: #666;">${edu.tahun || ''}</span>
          </div>
          <div style="font-size: 10pt; color: #444;">${edu.jenjang || ''} ${edu.jurusan || ''}</div>
        </div>`;
    });
    html += '</div>';
  }

  // Keahlian
  if (keahlian) {
    html += sectionDivider;
    html += `<div style="margin-bottom: 4px;">
      <h2 style="font-size: 11pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px 0; font-family: Arial, sans-serif;">KEAHLIAN</h2>
      <p style="margin: 0; font-size: 10pt;">${keahlian}</p>
    </div>`;
  }

  // Sertifikasi
  if (sertifikasi) {
    html += sectionDivider;
    html += `<div style="margin-bottom: 4px;">
      <h2 style="font-size: 11pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px 0; font-family: Arial, sans-serif;">SERTIFIKASI</h2>
      <div style="font-size: 10pt; white-space: pre-line;">${sertifikasi.split('\n').map(l => l.trim()).filter(Boolean).map(l => `• ${l}`).join('\n')}</div>
    </div>`;
  }

  html += '</div>';
  return html;
}
