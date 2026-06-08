// ============================================
// DocuGen - Surat Pengunduran Diri Template
// ============================================

export const templateOptions = [
  { id: 'default', name: 'Formal Standar', premium: false, description: 'Format resign letter standar' },
  { id: 'modern', name: 'Modern', premium: false, description: 'Desain modern dengan sentuhan profesional' },
];

export const formFields = [
  { name: 'nama', label: 'Nama Lengkap', type: 'text', placeholder: 'Budi Santoso', required: true, section: 'Data Diri', half: true },
  { name: 'jabatan', label: 'Jabatan/Posisi Saat Ini', type: 'text', placeholder: 'Staff Marketing', required: true, section: 'Data Diri', half: true },
  { name: 'departemen', label: 'Departemen', type: 'text', placeholder: 'Marketing', required: false, section: 'Data Diri', half: true },
  { name: 'nik_karyawan', label: 'NIK Karyawan (opsional)', type: 'text', placeholder: 'EMP-001', required: false, section: 'Data Diri', half: true },

  { name: 'perusahaan', label: 'Nama Perusahaan', type: 'text', placeholder: 'PT. Contoh Indonesia', required: true, section: 'Perusahaan' },
  { name: 'alamat_perusahaan', label: 'Alamat Perusahaan', type: 'textarea', placeholder: 'Jl. Perusahaan No. 456, Jakarta', required: false, section: 'Perusahaan', rows: 2 },
  { name: 'nama_atasan', label: 'Nama Atasan/HRD', type: 'text', placeholder: 'Bapak/Ibu ...', required: true, section: 'Perusahaan', half: true },
  { name: 'jabatan_atasan', label: 'Jabatan Atasan', type: 'text', placeholder: 'HRD Manager', required: false, section: 'Perusahaan', half: true },

  { name: 'tanggal_surat', label: 'Tanggal Surat', type: 'date', required: true, section: 'Detail Resign', half: true },
  { name: 'tanggal_efektif', label: 'Tanggal Efektif Resign', type: 'date', required: true, section: 'Detail Resign', half: true },
  { name: 'alasan', label: 'Alasan Pengunduran Diri', type: 'textarea', placeholder: 'Alasan resign Anda (opsional, bisa bersifat umum)', required: false, section: 'Detail Resign', rows: 3 },
  { name: 'pesan_kesan', label: 'Pesan & Kesan', type: 'textarea', placeholder: 'Ucapan terima kasih dan kesan selama bekerja...', required: false, section: 'Detail Resign', rows: 3 },
];

function formatDate(dateStr) {
  if (!dateStr) return '......................';
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const d = new Date(dateStr);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function generateHTML(data, templateId = 'default') {
  const nama = data.nama || '..............................';
  const jabatan = data.jabatan || '..............';
  const departemen = data.departemen || '';
  const perusahaan = data.perusahaan || '..............................';
  const alamat_perusahaan = data.alamat_perusahaan || '..............................';
  const nama_atasan = data.nama_atasan || '..............................';
  const jabatan_atasan = data.jabatan_atasan || 'HRD Manager';
  const tanggal_surat = formatDate(data.tanggal_surat);
  const tanggal_efektif = formatDate(data.tanggal_efektif);

  const alasan = data.alasan || 'alasan pribadi';
  const pesan = data.pesan_kesan || `Saya mengucapkan terima kasih atas kesempatan dan pengalaman yang telah diberikan selama saya bekerja di ${perusahaan}. Semoga perusahaan semakin maju dan sukses.`;

  if (templateId === 'modern') {
    return `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11pt; line-height: 1.7; color: #1a1a1a;">
        <div style="border-left: 4px solid #f43f5e; padding-left: 16px; margin-bottom: 24px;">
          <div style="font-size: 10pt; color: #555;">Jakarta, ${tanggal_surat}</div>
        </div>

        <div style="margin-bottom: 20px;">
          <div>Kepada Yth.</div>
          <div style="font-weight: bold;">${nama_atasan}</div>
          <div>${jabatan_atasan}</div>
          <div style="font-weight: bold;">${perusahaan}</div>
          <div>${alamat_perusahaan}</div>
        </div>

        <div style="margin-bottom: 16px;">
          <strong>Perihal:</strong> Pengunduran Diri
        </div>

        <div style="text-align: justify;">
          <p style="margin: 0 0 12px 0;">Dengan hormat,</p>
          <p style="margin: 0 0 12px 0; text-indent: 40px;">Saya yang bertanda tangan di bawah ini, <strong>${nama}</strong>, dengan jabatan sebagai <strong>${jabatan}</strong>${departemen ? ` di departemen <strong>${departemen}</strong>` : ''}, dengan ini mengajukan pengunduran diri dari ${perusahaan}, efektif per tanggal <strong>${tanggal_efektif}</strong>.</p>
          <p style="margin: 0 0 12px 0; text-indent: 40px;">Adapun alasan pengunduran diri saya adalah dikarenakan ${alasan}.</p>
          <p style="margin: 0 0 12px 0; text-indent: 40px;">${pesan}</p>
          <p style="margin: 0 0 12px 0; text-indent: 40px;">Saya bersedia membantu proses transisi pekerjaan selama masa pemberitahuan (notice period). Demikian surat ini saya buat dengan penuh kesadaran dan tanpa paksaan dari pihak manapun.</p>
        </div>

        <div style="margin-top: 36px;">
          <div>Hormat saya,</div>
          <div style="margin-top: 60px; font-weight: bold; border-bottom: 1px solid #333; display: inline-block; padding-bottom: 2px;">${nama}</div>
        </div>
      </div>`;
  }

  // Default Formal
  return `
    <div style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.8; color: #000;">
      <div style="text-align: right; margin-bottom: 24px;">
        Jakarta, ${tanggal_surat}
      </div>

      <div style="margin-bottom: 8px;">
        <div>Perihal: Pengunduran Diri</div>
      </div>

      <div style="margin-bottom: 20px;">
        <div>Kepada Yth.</div>
        <div><strong>${nama_atasan}</strong></div>
        <div>${jabatan_atasan}</div>
        <div><strong>${perusahaan}</strong></div>
        <div>di ${alamat_perusahaan}</div>
      </div>

      <div style="text-align: justify;">
        <p style="margin: 0 0 12px 0;">Dengan hormat,</p>
        <p style="margin: 0 0 12px 0; text-indent: 48px;">Saya yang bertanda tangan di bawah ini:</p>
        <table style="margin: 0 0 12px 48px; font-size: 12pt;">
          <tr><td style="padding-right: 16px;">Nama</td><td>: ${nama}</td></tr>
          <tr><td style="padding-right: 16px;">Jabatan</td><td>: ${jabatan}</td></tr>
          ${departemen ? `<tr><td style="padding-right: 16px;">Departemen</td><td>: ${departemen}</td></tr>` : ''}
        </table>
        <p style="margin: 0 0 12px 0; text-indent: 48px;">Dengan ini mengajukan permohonan pengunduran diri dari ${perusahaan}, efektif terhitung mulai tanggal <strong>${tanggal_efektif}</strong>.</p>
        <p style="margin: 0 0 12px 0; text-indent: 48px;">Adapun alasan pengunduran diri saya adalah dikarenakan ${alasan}.</p>
        <p style="margin: 0 0 12px 0; text-indent: 48px;">${pesan}</p>
        <p style="margin: 0 0 12px 0; text-indent: 48px;">Demikian surat pengunduran diri ini saya buat dengan penuh kesadaran dan tanpa paksaan dari pihak manapun. Atas perhatian dan pengertiannya, saya ucapkan terima kasih.</p>
      </div>

      <div style="margin-top: 36px;">
        <div>Hormat saya,</div>
        <br><br><br>
        <div style="font-weight: bold; text-decoration: underline;">${nama}</div>
      </div>
    </div>`;
}
