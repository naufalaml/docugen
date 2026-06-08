// ============================================
// DocuGen - Surat Izin Template
// ============================================

export const templateOptions = [
  { id: 'default', name: 'Formal Standar', premium: false, description: 'Format surat izin standar' },
  { id: 'modern', name: 'Modern', premium: false, description: 'Desain modern' },
];

export const formFields = [
  { name: 'nama', label: 'Nama Lengkap', type: 'text', placeholder: 'Budi Santoso', required: true, section: 'Data Diri', half: true },
  { name: 'nik', label: 'NIP/NIK (opsional)', type: 'text', placeholder: 'NIP/NIK', required: false, section: 'Data Diri', half: true },
  { name: 'jabatan', label: 'Jabatan/Kelas', type: 'text', placeholder: 'Staff / Kelas XII IPA 1', required: true, section: 'Data Diri', half: true },
  { name: 'telepon', label: 'No. Telepon', type: 'tel', placeholder: '08xxxxxxxxxx', required: false, section: 'Data Diri', half: true },

  { name: 'instansi', label: 'Nama Instansi/Sekolah', type: 'text', placeholder: 'PT. Contoh / SMA Negeri 1', required: true, section: 'Instansi' },
  { name: 'alamat_instansi', label: 'Alamat Instansi', type: 'textarea', placeholder: 'Jl. Contoh No. 123, Jakarta', required: false, section: 'Instansi', rows: 2 },
  { name: 'nama_atasan', label: 'Nama Atasan/Pejabat Dituju', type: 'text', placeholder: 'Bapak/Ibu ...', required: true, section: 'Instansi', half: true },
  { name: 'jabatan_atasan', label: 'Jabatan Pejabat', type: 'text', placeholder: 'HRD Manager / Kepala Sekolah', required: false, section: 'Instansi', half: true },

  { name: 'tanggal_surat', label: 'Tanggal Surat', type: 'date', required: true, section: 'Detail Izin', half: true },
  { name: 'jenis_izin', label: 'Jenis Izin', type: 'select', options: ['Izin Sakit', 'Izin Keperluan Keluarga', 'Izin Pribadi', 'Cuti Tahunan', 'Cuti Melahirkan', 'Lainnya'], required: true, section: 'Detail Izin', half: true },
  { name: 'tanggal_mulai', label: 'Tanggal Mulai Izin', type: 'date', required: true, section: 'Detail Izin', half: true },
  { name: 'tanggal_selesai', label: 'Tanggal Selesai Izin', type: 'date', required: true, section: 'Detail Izin', half: true },
  { name: 'alasan', label: 'Alasan/Keterangan', type: 'textarea', placeholder: 'Jelaskan alasan izin secara singkat...', required: false, section: 'Detail Izin', rows: 3 },
];

function formatDate(dateStr) {
  if (!dateStr) return '......................';
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const d = new Date(dateStr);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function generateHTML(data, templateId = 'default') {
  const nama = data.nama || '..............................';
  const nik = data.nik || '';
  const jabatan = data.jabatan || '..............';
  const instansi = data.instansi || '..............................';
  const alamat_instansi = data.alamat_instansi || '..............................';
  const nama_atasan = data.nama_atasan || '..............................';
  const jabatan_atasan = data.jabatan_atasan || 'Pimpinan';
  const tanggal_surat = formatDate(data.tanggal_surat);
  const jenis_izin = data.jenis_izin || 'Izin';
  const tanggal_mulai = formatDate(data.tanggal_mulai);
  const tanggal_selesai = formatDate(data.tanggal_selesai);
  const alasan = data.alasan || '..............................';

  if (templateId === 'modern') {
    return `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11pt; line-height: 1.7; color: #1a1a1a;">
        <div style="border-left: 4px solid #10b981; padding-left: 16px; margin-bottom: 24px;">
          <div style="font-size: 10pt; color: #555;">Jakarta, ${tanggal_surat}</div>
        </div>
        <div style="margin-bottom: 20px;">
          <div>Kepada Yth.</div>
          <div style="font-weight: bold;">${nama_atasan}</div>
          <div>${jabatan_atasan}</div>
          <div style="font-weight: bold;">${instansi}</div>
          <div>${alamat_instansi}</div>
        </div>
        <div style="margin-bottom: 16px;"><strong>Perihal:</strong> ${jenis_izin}</div>
        <div style="text-align: justify;">
          <p style="margin: 0 0 12px 0;">Dengan hormat,</p>
          <p style="margin: 0 0 12px 0; text-indent: 40px;">Saya yang bertanda tangan di bawah ini, <strong>${nama}</strong>${nik ? ` (${nik})` : ''}, dengan jabatan/kelas <strong>${jabatan}</strong>, bermaksud mengajukan <strong>${jenis_izin.toLowerCase()}</strong> pada:</p>
          <table style="margin: 0 0 12px 40px; font-size: 11pt;">
            <tr><td style="padding-right: 16px;">Tanggal Mulai</td><td>: ${tanggal_mulai}</td></tr>
            <tr><td style="padding-right: 16px;">Tanggal Selesai</td><td>: ${tanggal_selesai}</td></tr>
          </table>
          <p style="margin: 0 0 12px 0; text-indent: 40px;">Adapun alasan pengajuan izin ini adalah: ${alasan}.</p>
          <p style="margin: 0 0 12px 0; text-indent: 40px;">Demikian surat izin ini saya buat dengan sebenar-benarnya. Atas perhatian dan izin yang diberikan, saya ucapkan terima kasih.</p>
        </div>
        <div style="margin-top: 36px;">
          <div>Hormat saya,</div>
          <div style="margin-top: 60px; font-weight: bold; border-bottom: 1px solid #333; display: inline-block; padding-bottom: 2px;">${nama}</div>
        </div>
      </div>`;
  }

  return `
    <div style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.8; color: #000;">
      <div style="text-align: right; margin-bottom: 24px;">Jakarta, ${tanggal_surat}</div>
      <div style="margin-bottom: 8px;"><div>Perihal: ${jenis_izin}</div></div>
      <div style="margin-bottom: 20px;">
        <div>Kepada Yth.</div>
        <div><strong>${nama_atasan}</strong></div>
        <div>${jabatan_atasan}</div>
        <div><strong>${instansi}</strong></div>
        <div>di ${alamat_instansi}</div>
      </div>
      <div style="text-align: justify;">
        <p style="margin: 0 0 12px 0;">Dengan hormat,</p>
        <p style="margin: 0 0 12px 0; text-indent: 48px;">Saya yang bertanda tangan di bawah ini:</p>
        <table style="margin: 0 0 12px 48px; font-size: 12pt;">
          <tr><td style="padding-right: 16px;">Nama</td><td>: ${nama}</td></tr>
          ${nik ? `<tr><td style="padding-right: 16px;">NIP/NIK</td><td>: ${nik}</td></tr>` : ''}
          <tr><td style="padding-right: 16px;">Jabatan/Kelas</td><td>: ${jabatan}</td></tr>
        </table>
        <p style="margin: 0 0 12px 0; text-indent: 48px;">Dengan ini mengajukan ${jenis_izin.toLowerCase()} dari tanggal <strong>${tanggal_mulai}</strong> sampai dengan tanggal <strong>${tanggal_selesai}</strong>.</p>
        <p style="margin: 0 0 12px 0; text-indent: 48px;">Alasan: ${alasan}.</p>
        <p style="margin: 0 0 12px 0; text-indent: 48px;">Demikian surat izin ini saya buat dengan sebenar-benarnya. Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.</p>
      </div>
      <div style="margin-top: 36px;">
        <div>Hormat saya,</div><br><br><br>
        <div style="font-weight: bold; text-decoration: underline;">${nama}</div>
      </div>
    </div>`;
}
