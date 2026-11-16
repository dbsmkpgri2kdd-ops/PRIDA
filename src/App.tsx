import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Building2,
  Car,
  Cpu,
  Landmark,
  Network,
  ShoppingBag,
  Wrench,
  Download,
  X,
  Search,
  Lock,
  ShieldAlert,
  AlertCircle,
  UserCheck,
  Users,
  ExternalLink,
  Play,
  Shield,
  Trash2,
  Check,
  WifiOff,
  Home,
  GraduationCap,
  Briefcase,
  Clapperboard,
} from 'lucide-react';
import { useConsent } from './hooks/useConsent';
import { usePWAInstall } from './hooks/usePWAInstall';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import {
  fetchGoogleAppsScriptJsonp,
  fetchWithTimeout,
  extractYouTubeId,
  sanitizeExternalUrl,
  sanitizePlainText,
  clearLocalPortalData,
} from './utils/security';

const SCHOOL_ENDPOINTS = {
  KELULUSAN_API:
    'https://script.google.com/macros/s/AKfycbwE4oaM8yqhsHdyL6aEA4b0y-Z_V-UBpVw7RsJg0oBQeouffCS1W8yEORXBPnE4u7oHyg/exec',
  PORTAL_FEED_API:
    'https://script.google.com/macros/s/AKfycbzdUXE8vqAH7g2wa-XnvQWZm1-4cXxMlOjlxsUAufOhjx8OcMfcYe2U8OTa_nKxmsxu/exec',
  PTK_API:
    'https://script.google.com/macros/s/AKfycbxVPghKfdnp99pACz0akNkwD7cTN5xobHZg8lBGF8x7OcopVTTdubahMfkBYvNjfr_5Wg/exec',
};

const SCHOOL_IDENTITY = {
  name: 'SMKS PGRI 2 Kedondong',
  shortName: 'SMK PGRI 2 Kedondong',
  domain: 'https://smkpgri2kedondong.sch.id/',
  npsn: '10811003',
  level: 'SMK',
  status: 'Swasta',
  address: 'Jl. Tritura Kedondong, RT 01 / RW 01',
  village: 'Kedondong',
  district: 'Kec. Kedondong',
  regency: 'Kab. Pesawaran',
  province: 'Prov. Lampung',
  postalCode: '35381',
  establishedYear: '2003',
  landArea: '8.000 m²',
  contactEmail: 'info@smkpgri2kedondong.sch.id',
};

const MAJOR_PROGRAMS = [
  {
    code: 'TKR',
    name: 'Teknik Kendaraan Ringan',
    cluster: 'Teknologi Otomotif',
    summary: 'Membekali peserta didik dengan keterampilan perawatan mesin kendaraan ringan, sistem kelistrikan otomotif modern, sasis, dan pemindah tenaga.',
    competencies: ['Perawatan & overhaul mesin', 'Sistem injeksi bahan bakar (EFI)', 'Kelistrikan bodi & AC mobil'],
    careerPaths: ['Teknisi Bengkel Resmi', 'Wirausaha Otomotif', 'Inspektor Kendaraan'],
  },
  {
    code: 'TSM',
    name: 'Teknik Sepeda Motor',
    cluster: 'Teknologi Otomotif',
    summary: 'Fokus pada penguasaan teknologi sepeda motor konvensional hingga sistem injeksi dan motor listrik sesuai standar bengkel resmi.',
    competencies: ['Tune-up & perbaikan CVT', 'Diagnosis sensor sistem injeksi (PGM-FI)', 'Manajemen suku cadang'],
    careerPaths: ['Mekanik Sepeda Motor', 'Kepala Bengkel', 'Teknisi Mandiri'],
  },
  {
    code: 'TKJ',
    name: 'Teknik Komputer dan Jaringan',
    cluster: 'Teknologi Informasi',
    summary: 'Mempersiapkan tenaga terampil perakitan komputer, administrasi server, konfigurasi MikroTik, dan jaringan fiber optik.',
    competencies: ['Instalasi OS & troubleshooting', 'Routing, switching, & MikroTik', 'Jaringan nirkabel & keamanan dasar'],
    careerPaths: ['Network Administrator', 'IT Support Specialist', 'Teknisi ISP'],
  },
  {
    code: 'TAV',
    name: 'Teknik Audio Video',
    cluster: 'Teknologi Elektronika',
    summary: 'Mempelajari perancangan rangkaian elektronika, sistem tata suara profesional, perbaikan perangkat audio/video, serta CCTV.',
    competencies: ['Perakitan PCB elektronika', 'Sistem audio PA & broadcast', 'Pemeliharaan CCTV'],
    careerPaths: ['Teknisi Elektronika', 'Operator Tata Suara', 'Teknisi Industri'],
  },
  {
    code: 'BD',
    name: 'Bisnis Digital',
    cluster: 'Bisnis & Manajemen',
    summary: 'Menggabungkan pemasaran modern, pengelolaan toko daring, pembuatan konten visual komersial, dan analitik trafik digital.',
    competencies: ['Strategi pemasaran digital & copywriting', 'Pengelolaan marketplace', 'Analisis perilaku konsumen'],
    careerPaths: ['Digital Marketer', 'E-Commerce Specialist', 'Social Media Strategist'],
  },
  {
    code: 'LPS',
    name: 'Layanan Perbankan Syariah',
    cluster: 'Keuangan & Perbankan',
    summary: 'Kompeten dalam administrasi transaksi keuangan syariah, akuntansi lembaga keuangan, dan layanan nasabah.',
    competencies: ['Akuntansi perbankan syariah & akad muamalah', 'Operasional teller & customer service', 'Administrasi keuangan digital'],
    careerPaths: ['Teller / CS Bank Syariah', 'Staf Administrasi Keuangan', 'Analis Mikro Syariah'],
  },
];

const OFFICIAL_SOCIAL_LINKS = [
  { name: 'Instagram', handle: '@smkpgri2kdd', url: 'https://www.instagram.com/smkpgri2kdd/', description: 'Dokumentasi kegiatan dan prestasi.' },
  { name: 'WhatsApp Saluran', handle: 'Info Resmi', url: 'https://whatsapp.com/channel/0029VbAdeE6AInPmCmeupj3Z', description: 'Pengumuman cepat agenda sekolah.' },
  { name: 'TikTok', handle: '@smkpgri2kdd', url: 'https://www.tiktok.com/@smkpgri2kdd?_r=1&_t=ZS-99hN2VYkopM', description: 'Video praktik kejuruan.' },
  { name: 'Facebook', handle: 'SMK PGRI 2 Kedondong', url: 'https://www.facebook.com/', description: 'Komunitas alumni dan orang tua.' },
];

export type NavTab = 'beranda' | 'program' | 'literasi' | 'layanan' | 'media' | 'privasi' | 'ketentuan' | 'tentang' | 'kontak';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('beranda');
  const { consent, bannerOpen, saveConsent, reopenPreferences } = useConsent();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const isOnline = useOnlineStatus();
  const [selectedMajorCode, setSelectedMajorCode] = useState('TKJ');

  // UKK Lookup state
  const [namaSiswa, setNamaSiswa] = useState('');
  const [kelasSiswa, setKelasSiswa] = useState('');
  const [gradLoading, setGradLoading] = useState(false);
  const [gradError, setGradError] = useState<string | null>(null);
  const [gradResult, setGradResult] = useState<any>(null);

  const navigate = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckGraduation = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizePlainText(namaSiswa, 80);
    const cleanClass = sanitizePlainText(kelasSiswa, 30);
    if (!cleanName || !cleanClass) {
      setGradError('Harap isi Nama dan Kelas.');
      return;
    }
    setGradLoading(true);
    setGradError(null);
    try {
      const data = await fetchGoogleAppsScriptJsonp(SCHOOL_ENDPOINTS.KELULUSAN_API, {
        nama: cleanName,
        kelas: cleanClass,
      });
      setGradResult(data);
    } catch (err: any) {
      setGradError(err.message || 'Gagal memuat hasil.');
    } finally {
      setGradLoading(false);
    }
  };

  const activeMajor = MAJOR_PROGRAMS.find((m) => m.code === selectedMajorCode) || MAJOR_PROGRAMS[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 md:pb-0">
      {/* TopBar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#beranda" onClick={(e) => { e.preventDefault(); navigate('beranda'); }} className="font-bold text-lg text-[#001d3d]">
            SMK PGRI 2 Kedondong
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button onClick={() => navigate('beranda')} className={activeTab === 'beranda' ? 'text-[#001d3d] font-semibold' : ''}>Beranda</button>
            <button onClick={() => navigate('program')} className={activeTab === 'program' ? 'text-[#001d3d] font-semibold' : ''}>Program</button>
            <button onClick={() => navigate('literasi')} className={activeTab === 'literasi' ? 'text-[#001d3d] font-semibold' : ''}>Literasi</button>
            <button onClick={() => navigate('layanan')} className={activeTab === 'layanan' ? 'text-[#001d3d] font-semibold' : ''}>Layanan</button>
            <button onClick={() => navigate('media')} className={activeTab === 'media' ? 'text-[#001d3d] font-semibold' : ''}>Media</button>
          </nav>
          {!isInstalled && isInstallable && (
            <button onClick={install} className="flex items-center gap-2 bg-[#001d3d] text-white px-4 py-2 rounded-lg text-xs font-semibold">
              <Download className="w-3.5 h-3.5" /> Instal Aplikasi
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {activeTab === 'beranda' && (
          <div className="mx-auto max-w-6xl px-4 py-8 space-y-12">
            <div className="grid rounded-3xl border border-slate-200 bg-white lg:grid-cols-12 overflow-hidden">
              <div className="p-8 lg:col-span-6 flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#003566]">Portal Digital Resmi</p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#001d3d]">Pendidikan Vokasi Unggul & Berkarakter</h1>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  Selamat datang di portal resmi SMK PGRI 2 Kedondong, Kabupaten Pesawaran, Lampung. Akses informasi kejuruan, literasi digital, dan pengumuman akademik secara aman.
                </p>
                <div className="mt-6 flex gap-4">
                  <button onClick={() => navigate('program')} className="bg-[#001d3d] text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
                    Lihat 6 Jurusan <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="bg-[#001d3d] lg:col-span-6 p-8 text-white flex items-center justify-center">
                <div className="text-center space-y-3">
                  <Building2 className="w-16 h-16 mx-auto opacity-80" />
                  <p className="font-bold text-lg">NPSN: {SCHOOL_IDENTITY.npsn}</p>
                  <p className="text-xs opacity-75">Terakreditasi & Siap Menyongsong Dunia Industri</p>
                </div>
              </div>
            </div>

            {/* Jurusan Preview */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Program Keahlian</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {MAJOR_PROGRAMS.map((m) => (
                  <div key={m.code} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
                    <span className="text-xs font-bold text-[#003566]">{m.code}</span>
                    <h3 className="font-bold text-base text-slate-900">{m.name}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{m.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'program' && (
          <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Program Keahlian & Konsentrasi</h1>
            <div className="flex flex-wrap gap-2">
              {MAJOR_PROGRAMS.map((m) => (
                <button
                  key={m.code}
                  onClick={() => setSelectedMajorCode(m.code)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold ${selectedMajorCode === m.code ? 'bg-[#001d3d] text-white' : 'bg-white border border-slate-200 text-slate-700'}`}
                >
                  {m.code} — {m.name}
                </button>
              ))}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
              <h2 className="text-2xl font-bold text-[#001d3d]">{activeMajor.name}</h2>
              <p className="text-sm text-slate-700">{activeMajor.summary}</p>
              <div>
                <h4 className="font-semibold text-xs text-slate-500 uppercase">Kompetensi</h4>
                <ul className="list-disc pl-5 mt-2 text-sm text-slate-700 space-y-1">
                  {activeMajor.competencies.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layanan' && (
          <div className="mx-auto max-w-4xl px-4 py-8 space-y-8">
            <h1 className="text-3xl font-bold text-slate-900">Layanan Akademik & Kelulusan</h1>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">Cek Pengumuman UKK</h2>
              <form onSubmit={handleCheckGraduation} className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Nama Lengkap Siswa"
                  value={namaSiswa}
                  onChange={(e) => setNamaSiswa(e.target.value)}
                  className="rounded-xl border border-slate-300 p-3 text-sm"
                />
                <input
                  type="text"
                  placeholder="Kelas (Contoh: XII TKJ 1)"
                  value={kelasSiswa}
                  onChange={(e) => setKelasSiswa(e.target.value)}
                  className="rounded-xl border border-slate-300 p-3 text-sm"
                />
                <button type="submit" className="sm:col-span-2 bg-[#001d3d] text-white py-3 rounded-xl font-semibold text-sm">
                  {gradLoading ? 'Memeriksa…' : 'Cek Status Kelulusan'}
                </button>
              </form>
              {gradError && <p className="text-sm text-red-600">{gradError}</p>}
              {gradResult && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                  <p><strong>Status:</strong> {gradResult.status || 'Data diperiksa'}</p>
                  <p><strong>Nama:</strong> {gradResult.nama || namaSiswa}</p>
                  <p><strong>Keterangan:</strong> {gradResult.keterangan || 'Selesai'}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'literasi' && (
          <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Literasi Digital & Keamanan Data</h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pelajari pentingnya menjaga keamanan kredensial, etika berinternet, dan pemanfaatan teknologi secara bijak di lingkungan sekolah.
            </p>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Media Sosial Resmi</h1>
            <div className="grid gap-4 sm:grid-cols-2">
              {OFFICIAL_SOCIAL_LINKS.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-slate-200 bg-white p-5 block hover:border-[#003566]">
                  <p className="font-bold text-slate-900">{s.name}</p>
                  <p className="text-xs text-[#003566] mt-1">{s.handle}</p>
                  <p className="text-xs text-slate-600 mt-2">{s.description}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'privasi' || activeTab === 'ketentuan' || activeTab === 'tentang' || activeTab === 'kontak') && (
          <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
            <h1 className="text-3xl font-bold text-slate-900 capitalize">{activeTab} Sekolah</h1>
            <p className="text-sm text-slate-700 leading-relaxed">
              Portal resmi {SCHOOL_IDENTITY.name} ({SCHOOL_IDENTITY.domain}) mematuhi Undang-Undang Pelindungan Data Pribadi (UU PDP No. 27/2022) serta standar pedoman penayang Google AdSense.
            </p>
            <button onClick={reopenPreferences} className="text-xs font-semibold text-[#003566] underline">
              Kelola Pengaturan Cookie & Privasi
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-[#001d3d] text-slate-300 py-8 px-4 text-xs text-center space-y-2">
        <p>© 2026 {SCHOOL_IDENTITY.name} (NPSN: {SCHOOL_IDENTITY.npsn}). Hak cipta dilindungi.</p>
        <p>Jl. Tritura Kedondong, Kab. Pesawaran, Lampung 35381</p>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav aria-label="Navigasi Mobile" className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white flex h-14 justify-around items-center md:hidden">
        <button onClick={() => navigate('beranda')} className={`flex flex-col items-center text-[10px] ${activeTab === 'beranda' ? 'text-[#001d3d] font-bold' : 'text-slate-500'}`}><Home className="w-4 h-4" />Beranda</button>
        <button onClick={() => navigate('program')} className={`flex flex-col items-center text-[10px] ${activeTab === 'program' ? 'text-[#001d3d] font-bold' : 'text-slate-500'}`}><GraduationCap className="w-4 h-4" />Jurusan</button>
        <button onClick={() => navigate('literasi')} className={`flex flex-col items-center text-[10px] ${activeTab === 'literasi' ? 'text-[#001d3d] font-bold' : 'text-slate-500'}`}><BookOpen className="w-4 h-4" />Literasi</button>
        <button onClick={() => navigate('layanan')} className={`flex flex-col items-center text-[10px] ${activeTab === 'layanan' ? 'text-[#001d3d] font-bold' : 'text-slate-500'}`}><Briefcase className="w-4 h-4" />Layanan</button>
        <button onClick={() => navigate('media')} className={`flex flex-col items-center text-[10px] ${activeTab === 'media' ? 'text-[#001d3d] font-bold' : 'text-slate-500'}`}><Clapperboard className="w-4 h-4" />Media</button>
      </nav>

      {/* Cookie Consent Banner */}
      {bannerOpen && (
        <aside className="fixed bottom-16 left-4 right-4 z-40 mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl md:bottom-5">
          <p className="text-xs font-semibold text-slate-900">Kebijakan Privasi & Cookie (UU PDP)</p>
          <p className="mt-1 text-xs text-slate-600">
            Situs ini menggunakan cookie untuk fungsionalitas PWA dan iklan Google AdSense yang relevan. Anda dapat menyetujui atau mengelolanya sesuai preferensi.
          </p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => saveConsent('all')} className="bg-[#001d3d] text-white px-3.5 py-2 rounded-lg text-xs font-semibold">Terima Semua</button>
            <button onClick={() => saveConsent('essential')} className="border border-slate-300 text-slate-700 px-3.5 py-2 rounded-lg text-xs font-semibold">Esensial Saja</button>
          </div>
        </aside>
      )}

      {!isOnline && (
        <div className="fixed bottom-20 left-4 z-40 bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-md">
          Mode Offline
        </div>
      )}
    </div>
  );
}
