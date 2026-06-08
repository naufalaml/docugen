// ============================================
// DocuGen - Surat Lamaran Kerja Template
// ============================================

export const templateOptions = [
  { id: 'default', name: 'Klasik Formal', premium: false, description: 'Format surat lamaran standar Indonesia' },
  { id: 'modern', name: 'Modern Clean', premium: false, description: 'Desain modern dengan aksen warna' },
  { id: 'executive', name: 'Executive Pro', premium: true, description: 'Template premium untuk posisi eksekutif' },
];

export const formFields = [
  // Data Diri
  { name: 'nama', label: 'Nama Lengkap', type: 'text', placeholder: 'Contoh: Budi Santoso', required: true, section: 'Data Diri', half: true },
  { name: 'telepon', label: 'No. Telepon', type: 'tel', placeholder: '08xxxxxxxxxx', required: true, section: 'Data Diri', half: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'email@contoh.com', required: false, section: 'Data Diri', half: true },
  { name: 'kota', label: 'Kota', type: 'text', placeholder: 'Jakarta', required: true, section: 'Data Diri', half: true },
  { name: 'alamat', label: 'Alamat Lengkap', type: 'textarea', placeholder: 'Jl. Contoh No. 123, RT/RW, Kelurahan, Kecamatan', required: true, section: 'Data Diri', rows: 2 },
  
  // Tujuan Surat
  { name: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true, section: 'Tujuan Surat', half: true },
  { name: 'posisi', label: 'Posisi yang Dilamar', type: 'text', placeholder: 'Contoh: Staff Marketing', required: true, section: 'Tujuan Surat', half: true },
  { name: 'perusahaan', label: 'Nama Perusahaan', type: 'text', placeholder: 'PT. Contoh Indonesia', required: true, section: 'Tujuan Surat' },
  { name: 'alamat_perusahaan', label: 'Alamat Perusahaan', type: 'textarea', placeholder: 'Jl. Perusahaan No. 456, Jakarta', required: false, section: 'Tujuan Surat', rows: 2 },
  { name: 'penerima', label: 'Nama Penerima (HRD)', type: 'text', placeholder: 'Bapak/Ibu HRD atau nama spesifik', required: false, section: 'Tujuan Surat' },
  { name: 'sumber_info', label: 'Sumber Info Lowongan', type: 'select', options: ['Website Perusahaan', 'JobStreet', 'LinkedIn', 'Instagram', 'Referensi Teman', 'Koran/Media', 'Job Fair', 'Lainnya'], required: false, section: 'Tujuan Surat' },

  // Isi Surat
  { name: 'paragraf_pembuka', label: 'Paragraf Pembuka', type: 'textarea', placeholder: 'Perkenalkan diri Anda dan jelaskan tujuan menulis surat ini...', required: false, section: 'Isi Surat', rows: 4 },
  { name: 'pengalaman', label: 'Pengalaman & Keahlian', type: 'textarea', placeholder: 'Jelaskan pengalaman kerja, keahlian, dan kualifikasi Anda yang relevan...', required: false, section: 'Isi Surat', rows: 5 },
  { name: 'paragraf_penutup', label: 'Paragraf Penutup', type: 'textarea', placeholder: 'Sampaikan harapan dan kesediaan untuk interview...', required: false, section: 'Isi Surat', rows: 3 },
];

function formatDate(dateStr) {
  if (!dateStr) return '......................';
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const d = new Date(dateStr);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function generateHTML(data, templateId = 'default') {
  const nama = data.nama || '..............................';
  const kota = data.kota || '..............';
  const tanggal = formatDate(data.tanggal);
  const perusahaan = data.perusahaan || '..............................';
  const alamat_perusahaan = data.alamat_perusahaan || '..............................';
  const penerima = data.penerima || 'HRD Manager';
  const posisi = data.posisi || '..............................';
  const sumber = data.sumber_info || '..............';
  const alamat = data.alamat || '..............................';
  const telepon = data.telepon || '..............................';
  const email = data.email || '';
  
  const pembuka = data.paragraf_pembuka || `Dengan hormat, saya yang bertanda tangan di bawah ini mengajukan lamaran pekerjaan untuk posisi ${posisi} di ${perusahaan}. Saya mengetahui informasi lowongan ini melalui ${sumber}.`;
  const pengalaman = data.pengalaman || 'Saya memiliki pengalaman dan keahlian yang relevan dengan posisi yang ditawarkan. Saya yakin dapat memberikan kontribusi positif bagi perusahaan.';
  const penutup = data.paragraf_penutup || 'Demikian surat lamaran ini saya buat. Besar harapan saya untuk dapat diberikan kesempatan wawancara agar dapat menjelaskan lebih detail mengenai potensi diri saya. Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.';

  if (templateId === 'modern') {
    return `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11pt; line-height: 1.7; color: #1a1a1a;">
        <div style="border-left: 4px solid #6366f1; padding-left: 16px; margin-bottom: 24px;">
          <div style="font-size: 10pt; color: #555;">${kota}, ${tanggal}</div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <div>Kepada Yth.</div>
          <div style="font-weight: bold;">${penerima}</div>
          <div style="font-weight: bold;">${perusahaan}</div>
          <div>${alamat_perusahaan}</div>
        </div>
        
        <div style="margin-bottom: 16px;">
          <strong>Perihal:</strong> Lamaran Pekerjaan — <em>${posisi}</em>
        </div>
        
        <div style="margin-bottom: 16px; text-align: justify;">
          <p style="margin: 0 0 12px 0;">Dengan hormat,</p>
          <p style="margin: 0 0 12px 0; text-indent: 40px;">${pembuka}</p>
          <p style="margin: 0 0 12px 0; text-indent: 40px;">${pengalaman}</p>
          <p style="margin: 0 0 12px 0; text-indent: 40px;">${penutup}</p>
        </div>
        
        <div style="margin-top: 32px;">
          <div>Hormat saya,</div>
          <div style="margin-top: 60px; font-weight: bold; border-bottom: 1px solid #333; display: inline-block; padding-bottom: 2px;">
            ${nama}
          </div>
          <div style="font-size: 10pt; color: #555; margin-top: 4px;">
            ${alamat}<br>
            Telp: ${telepon}${email ? `<br>Email: ${email}` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // Default - Classic Formal
  return `
    <div style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.8; color: #000;">
      <div style="text-align: right; margin-bottom: 24px;">
        ${kota}, ${tanggal}
      </div>
      
      <div style="margin-bottom: 8px;">
        <div>Perihal: Lamaran Pekerjaan</div>
        <div>Lampiran: 1 (satu) berkas</div>
      </div>
      
      <div style="margin-bottom: 20px;">
        <div>Kepada Yth.</div>
        <div><strong>${penerima}</strong></div>
        <div><strong>${perusahaan}</strong></div>
        <div>di ${alamat_perusahaan}</div>
      </div>
      
      <div style="margin-bottom: 16px; text-align: justify;">
        <p style="margin: 0 0 12px 0;">Dengan hormat,</p>
        <p style="margin: 0 0 12px 0; text-indent: 48px;">${pembuka}</p>
        <p style="margin: 0 0 12px 0; text-indent: 48px;">${pengalaman}</p>
        <p style="margin: 0 0 12px 0; text-indent: 48px;">${penutup}</p>
      </div>
      
      <div style="margin-top: 36px;">
        <div>Hormat saya,</div>
        <br><br><br>
        <div style="font-weight: bold; text-decoration: underline;">
          ${nama}
        </div>
        <div style="font-size: 11pt;">
          Alamat: ${alamat}<br>
          Telp: ${telepon}${email ? `<br>Email: ${email}` : ''}
        </div>
      </div>
    </div>
  `;
}
