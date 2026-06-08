// ============================================
// DocuGen - Surat Kuasa Template
// ============================================

export const templateOptions = [
  { id: 'default', name: 'Formal Legal', premium: false, description: 'Format surat kuasa standar legal' },
  { id: 'modern', name: 'Modern Clean', premium: false, description: 'Desain modern lebih bersih' },
];

export const formFields = [
  { name: 'tempat', label: 'Tempat (Kota)', type: 'text', placeholder: 'Jakarta', required: true, section: 'Info Surat', half: true },
  { name: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true, section: 'Info Surat', half: true },
  { name: 'nomor_surat', label: 'Nomor Surat (opsional)', type: 'text', placeholder: 'No: 001/SK/VI/2024', required: false, section: 'Info Surat' },

  { name: 'nama_pemberi', label: 'Nama Lengkap', type: 'text', placeholder: 'Budi Santoso', required: true, section: 'Pemberi Kuasa', half: true },
  { name: 'nik_pemberi', label: 'No. KTP/NIK', type: 'text', placeholder: '3201xxxxxxxxxxxx', required: true, section: 'Pemberi Kuasa', half: true },
  { name: 'alamat_pemberi', label: 'Alamat', type: 'textarea', placeholder: 'Jl. Contoh No. 123, Jakarta', required: true, section: 'Pemberi Kuasa', rows: 2 },
  { name: 'pekerjaan_pemberi', label: 'Pekerjaan', type: 'text', placeholder: 'Karyawan Swasta', required: false, section: 'Pemberi Kuasa', half: true },
  { name: 'telepon_pemberi', label: 'No. Telepon', type: 'tel', placeholder: '08xxxxxxxxxx', required: false, section: 'Pemberi Kuasa', half: true },

  { name: 'nama_penerima', label: 'Nama Lengkap', type: 'text', placeholder: 'Siti Aminah', required: true, section: 'Penerima Kuasa', half: true },
  { name: 'nik_penerima', label: 'No. KTP/NIK', type: 'text', placeholder: '3201xxxxxxxxxxxx', required: true, section: 'Penerima Kuasa', half: true },
  { name: 'alamat_penerima', label: 'Alamat', type: 'textarea', placeholder: 'Jl. Penerima No. 456, Bandung', required: true, section: 'Penerima Kuasa', rows: 2 },
  { name: 'pekerjaan_penerima', label: 'Pekerjaan', type: 'text', placeholder: 'Wiraswasta', required: false, section: 'Penerima Kuasa', half: true },
  { name: 'telepon_penerima', label: 'No. Telepon', type: 'tel', placeholder: '08xxxxxxxxxx', required: false, section: 'Penerima Kuasa', half: true },

  { name: 'keperluan', label: 'Keperluan/Tujuan Kuasa', type: 'textarea', placeholder: 'Mengambil dokumen, mengurus administrasi, dll...', required: true, section: 'Detail Kuasa', rows: 4 },
  { name: 'masa_berlaku', label: 'Masa Berlaku', type: 'text', placeholder: 'Sampai selesai / 30 hari', required: false, section: 'Detail Kuasa' },
];

function formatDate(dateStr) {
  if (!dateStr) return '......................';
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const d = new Date(dateStr);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function generateHTML(data, templateId = 'default') {
  const tempat = data.tempat || '..............';
  const tanggal = formatDate(data.tanggal);
  const nomor = data.nomor_surat || '';

  const np = data.nama_pemberi || '..............................';
  const nikp = data.nik_pemberi || '..............................';
  const ap = data.alamat_pemberi || '..............................';
  const pp = data.pekerjaan_pemberi || '..............................';
  const tp = data.telepon_pemberi || '';

  const nn = data.nama_penerima || '..............................';
  const nikn = data.nik_penerima || '..............................';
  const an = data.alamat_penerima || '..............................';
  const pn = data.pekerjaan_penerima || '..............................';
  const tn = data.telepon_penerima || '';

  const keperluan = data.keperluan || '..............................';
  const masa = data.masa_berlaku || 'sampai dengan selesainya keperluan tersebut';

  if (templateId === 'modern') {
    return `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11pt; line-height: 1.7; color: #1a1a1a;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="font-size: 16pt; font-weight: bold; letter-spacing: 3px; margin: 0; border-bottom: 2px solid #f59e0b; display: inline-block; padding-bottom: 6px;">SURAT KUASA</h1>
          ${nomor ? `<div style="font-size: 10pt; color: #666; margin-top: 6px;">${nomor}</div>` : ''}
        </div>
        <p style="margin: 0 0 16px 0;">Yang bertanda tangan di bawah ini:</p>
        <table style="margin: 0 0 16px 20px; font-size: 11pt; width: calc(100% - 20px);">
          <tr><td style="width: 120px; padding: 2px 12px 2px 0; vertical-align: top;">Nama</td><td style="padding: 2px 0; vertical-align: top;">: ${np}</td></tr>
          <tr><td style="padding: 2px 12px 2px 0; vertical-align: top;">No. KTP</td><td style="padding: 2px 0; vertical-align: top;">: ${nikp}</td></tr>
          <tr><td style="padding: 2px 12px 2px 0; vertical-align: top;">Alamat</td><td style="padding: 2px 0; vertical-align: top;">: ${ap}</td></tr>
          <tr><td style="padding: 2px 12px 2px 0; vertical-align: top;">Pekerjaan</td><td style="padding: 2px 0; vertical-align: top;">: ${pp}</td></tr>
        </table>
        <p style="margin: 0 0 12px 0;">Selanjutnya disebut sebagai <strong>"Pemberi Kuasa"</strong>, dengan ini memberikan kuasa kepada:</p>
        <table style="margin: 0 0 16px 20px; font-size: 11pt; width: calc(100% - 20px);">
          <tr><td style="width: 120px; padding: 2px 12px 2px 0; vertical-align: top;">Nama</td><td style="padding: 2px 0; vertical-align: top;">: ${nn}</td></tr>
          <tr><td style="padding: 2px 12px 2px 0; vertical-align: top;">No. KTP</td><td style="padding: 2px 0; vertical-align: top;">: ${nikn}</td></tr>
          <tr><td style="padding: 2px 12px 2px 0; vertical-align: top;">Alamat</td><td style="padding: 2px 0; vertical-align: top;">: ${an}</td></tr>
          <tr><td style="padding: 2px 12px 2px 0; vertical-align: top;">Pekerjaan</td><td style="padding: 2px 0; vertical-align: top;">: ${pn}</td></tr>
        </table>
        <p style="margin: 0 0 12px 0;">Selanjutnya disebut sebagai <strong>"Penerima Kuasa"</strong>.</p>
        <div style="border-left: 3px solid #f59e0b; padding-left: 14px; margin: 16px 0; text-align: justify;">
          <p style="margin: 0 0 8px 0;"><strong>Untuk dan atas nama Pemberi Kuasa, melakukan hal-hal sebagai berikut:</strong></p>
          <p style="margin: 0;">${keperluan}</p>
        </div>
        <p style="margin: 16px 0; text-align: justify;">Surat kuasa ini berlaku ${masa}. Demikian surat kuasa ini dibuat untuk dapat dipergunakan sebagaimana mestinya.</p>
        <div style="text-align: right; font-size: 10pt; color: #555; margin-bottom: 12px;">${tempat}, ${tanggal}</div>
        <div style="display: flex; justify-content: space-between; margin-top: 16px;">
          <div style="text-align: center; width: 45%;">
            <div style="font-weight: bold;">Pemberi Kuasa</div>
            <div style="margin-top: 70px; font-weight: bold; border-bottom: 1px solid #333; display: inline-block; padding-bottom: 2px;">${np}</div>
          </div>
          <div style="text-align: center; width: 45%;">
            <div style="font-weight: bold;">Penerima Kuasa</div>
            <div style="margin-top: 70px; font-weight: bold; border-bottom: 1px solid #333; display: inline-block; padding-bottom: 2px;">${nn}</div>
          </div>
        </div>
      </div>`;
  }

  // Default - Formal Legal
  return `
    <div style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.8; color: #000;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="font-size: 16pt; font-weight: bold; text-decoration: underline; letter-spacing: 3px; margin: 0;">SURAT KUASA</h1>
        ${nomor ? `<div style="font-size: 11pt; margin-top: 4px;">${nomor}</div>` : ''}
      </div>

      <p style="margin: 0 0 16px 0;">Yang bertanda tangan di bawah ini:</p>

      <table style="margin: 0 0 16px 24px; font-size: 12pt; width: calc(100% - 24px);">
        <tr><td style="width: 130px; padding: 2px 16px 2px 0; vertical-align: top;">Nama</td><td style="padding: 2px 0; vertical-align: top;">: ${np}</td></tr>
        <tr><td style="padding: 2px 16px 2px 0; vertical-align: top;">No. KTP/NIK</td><td style="padding: 2px 0; vertical-align: top;">: ${nikp}</td></tr>
        <tr><td style="padding: 2px 16px 2px 0; vertical-align: top;">Alamat</td><td style="padding: 2px 0; vertical-align: top;">: ${ap}</td></tr>
        <tr><td style="padding: 2px 16px 2px 0; vertical-align: top;">Pekerjaan</td><td style="padding: 2px 0; vertical-align: top;">: ${pp}</td></tr>
        ${tp ? `<tr><td style="padding: 2px 16px 2px 0; vertical-align: top;">No. Telepon</td><td style="padding: 2px 0; vertical-align: top;">: ${tp}</td></tr>` : ''}
      </table>

      <p style="margin: 0 0 16px 0;">Selanjutnya disebut sebagai <strong>PEMBERI KUASA</strong>, dengan ini memberikan kuasa kepada:</p>

      <table style="margin: 0 0 16px 24px; font-size: 12pt; width: calc(100% - 24px);">
        <tr><td style="width: 130px; padding: 2px 16px 2px 0; vertical-align: top;">Nama</td><td style="padding: 2px 0; vertical-align: top;">: ${nn}</td></tr>
        <tr><td style="padding: 2px 16px 2px 0; vertical-align: top;">No. KTP/NIK</td><td style="padding: 2px 0; vertical-align: top;">: ${nikn}</td></tr>
        <tr><td style="padding: 2px 16px 2px 0; vertical-align: top;">Alamat</td><td style="padding: 2px 0; vertical-align: top;">: ${an}</td></tr>
        <tr><td style="padding: 2px 16px 2px 0; vertical-align: top;">Pekerjaan</td><td style="padding: 2px 0; vertical-align: top;">: ${pn}</td></tr>
        ${tn ? `<tr><td style="padding: 2px 16px 2px 0; vertical-align: top;">No. Telepon</td><td style="padding: 2px 0; vertical-align: top;">: ${tn}</td></tr>` : ''}
      </table>

      <p style="margin: 0 0 12px 0;">Selanjutnya disebut sebagai <strong>PENERIMA KUASA</strong>.</p>

      <hr style="border: none; border-top: 1px solid #999; margin: 16px 0;">

      <p style="margin: 0 0 12px 0; text-align: justify;"><strong>---KHUSUS---</strong></p>
      <p style="margin: 0 0 12px 0; text-align: justify;">Untuk dan atas nama Pemberi Kuasa, melakukan hal-hal sebagai berikut:</p>
      <p style="margin: 0 0 16px 24px; text-align: justify;">${keperluan}</p>

      <p style="margin: 0 0 12px 0; text-align: justify;">Surat kuasa ini berlaku ${masa}.</p>
      <p style="margin: 0 0 20px 0; text-align: justify;">Demikian surat kuasa ini dibuat dan ditandatangani oleh Pemberi Kuasa dalam keadaan sadar dan tanpa paksaan dari pihak manapun, untuk dapat dipergunakan sebagaimana mestinya.</p>

      <div style="text-align: right; margin-bottom: 16px;">${tempat}, ${tanggal}</div>

      <div style="display: flex; justify-content: space-between; margin-top: 8px;">
        <div style="text-align: center; width: 45%;">
          <div>Pemberi Kuasa,</div>
          <div style="margin-top: 10px; font-size: 9pt; color: #999;">Materai Rp 10.000</div>
          <br><br>
          <div style="font-weight: bold; text-decoration: underline;">${np}</div>
        </div>
        <div style="text-align: center; width: 45%;">
          <div>Penerima Kuasa,</div>
          <br><br><br>
          <div style="font-weight: bold; text-decoration: underline;">${nn}</div>
        </div>
      </div>

      <div style="margin-top: 24px; border-top: 1px solid #ccc; padding-top: 12px;">
        <div style="font-size: 11pt;">Saksi-saksi:</div>
        <div style="display: flex; justify-content: space-between; margin-top: 8px;">
          <div style="text-align: center; width: 45%;">
            <div style="font-size: 10pt;">Saksi 1:</div><br><br>
            <div>(...............................)</div>
          </div>
          <div style="text-align: center; width: 45%;">
            <div style="font-size: 10pt;">Saksi 2:</div><br><br>
            <div>(...............................)</div>
          </div>
        </div>
      </div>
    </div>`;
}
