const KELULUSAN_API = 'https://script.google.com/macros/s/AKfycbwE4oaM8yqhsHdyL6aEA4b0y-Z_V-UBpVw7RsJg0oBQeouffCS1W8yEORXBPnE4u7oHyg/exec';
const API_URL = 'https://script.google.com/macros/s/AKfycbzdUXE8vqAH7g2wa-XnvQWZm1-4cXxMlOjlxsUAufOhjx8OcMfcYe2U8OTa_nKxmsxu/exec';
const PTK_API_URL = 'https://script.google.com/macros/s/AKfycbwvjXmZX0lRmFifHixi1WTvxc2V5kmbLSQrkmXcLutEicV_UeTqzq1C2zQk6ZLKTVRg/exec';
const UJIAN_API_URL = 'https://script.google.com/macros/s/AKfycbxUHb3xhYk1w47vDI-iidkLcqLgQeldIgsYhNnfLAdDnsfVtPW4HjD7vLznmrB3EOaG/exec';

        // --- CONSTANTS & DATA ---
        const KELULUSAN_API = 'https://script.google.com/macros/s/AKfycbwE4oaM8yqhsHdyL6aEA4b0y-Z_V-UBpVw7RsJg0oBQeouffCS1W8yEORXBPnE4u7oHyg/exec';
        const API_URL = 'https://script.google.com/macros/s/AKfycbzdUXE8vqAH7g2wa-XnvQWZm1-4cXxMlOjlxsUAufOhjx8OcMfcYe2U8OTa_nKxmsxu/exec';
        const PTK_API_URL = 'https://script.google.com/macros/s/AKfycbwvjXmZX0lRmFifHixi1WTvxc2V5kmbLSQrkmXcLutEicV_UeTqzq1C2zQk6ZLKTVRg/exec';
        const UJIAN_API_URL = 'https://script.google.com/macros/s/AKfycbxUHb3xhYk1w47vDI-iidkLcqLgQeldIgsYhNnfLAdDnsfVtPW4HjD7vLznmrB3EOaG/exec';


        const DYNAMIC_DATA = {
            'Sejarah Lembaga': `
                <p><b>Pendirian SMK PGRI 2 Kedondong</b> dilatarbelakangi oleh kondisi di Kecamatan Kedondong dan sekitarnya (Way Lima, Way Khilau, Padang Cermin Kabupaten Lampung Selatan—sekarang menjadi Kabupaten Pesawaran—dan Kecamatan Pardasuka Kabupaten Tanggamus) yang pada saat itu belum memiliki Sekolah Menengah Kejuruan (SMK) bidang Teknologi.</p><br>
                <p>SMK PGRI 2 Kedondong didirikan oleh panitia yang dimotori oleh DR. Andi Munandar, M.M., M.Si. pada tahun 2003. Sekolah ini langsung menerima siswa baru angkatan pertama pada tahun pelajaran 2003/2004 berdasarkan Surat Keputusan Pengurus Yayasan Pembina Lembaga Pendidikan Persatuan Guru Republik Indonesia (YPLP-PGRI) Nomor: 24/C/YPLP-PGRI/V/2004 tertanggal 22 Mei 2004.</p><br>
                <p>Izin operasional sekolah diterbitkan dengan Nomor: 42.5/966/11.2/2006 pada tanggal 24 Februari 2006 oleh Kepala Dinas Pendidikan Kabupaten Lampung Selatan. Sekolah ini berdiri di atas tanah seluas 8.000 m² milik Drs. Hi. Aminullah Ihsan.</p><br>
                <p>Berdasarkan Undang-Undang Nomor 33 Tahun 2007, wilayah ini resmi menjadi bagian dari Kabupaten Pesawaran. Peresmian pembentukan Kabupaten Pesawaran dilakukan pada 2 November 2007 oleh Mendagri atas nama Presiden Republik Indonesia.</p>`,

            'Identitas Sekolah': `
                <div style="line-height: 1.6;">
                    <h3 style="margin-bottom: 15px;">A. IDENTITAS SEKOLAH</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="width: 140px; padding: 5px 0;">Nama Sekolah</td><td style="width: 10px;">:</td><td><b>SMKS PGRI 2 KEDONDONG</b></td></tr>
                        <tr><td style="padding: 5px 0;">NPSN</td><td>:</td><td>10811003</td></tr>
                        <tr><td style="padding: 5px 0;">Jenjang</td><td>:</td><td>SMK</td></tr>
                        <tr><td style="padding: 5px 0;">Status</td><td>:</td><td>Swasta</td></tr>
                        <tr><td style="padding: 5px 0; vertical-align: top;">Alamat</td><td style="vertical-align: top;">:</td><td>JL. TRITURA KEDONDONG</td></tr>
                        <tr><td style="padding: 5px 0;">RT / RW</td><td>:</td><td>1 / 1</td></tr>
                        <tr><td style="padding: 5px 0;">Kode Pos</td><td>:</td><td>35381</td></tr>
                        <tr><td style="padding: 5px 0;">Kelurahan</td><td>:</td><td>Kedondong</td></tr>
                        <tr><td style="padding: 5px 0;">Kecamatan</td><td>:</td><td>Kec. Kedondong</td></tr>
                        <tr><td style="padding: 5px 0;">Kabupaten</td><td>:</td><td>Kab. Pesawaran</td></tr>
                        <tr><td style="padding: 5px 0;">Provinsi</td><td>:</td><td>Prov. Lampung</td></tr>
                    </table>
                </div>`,

            'Jurusan SMK': `
                <p>Tersedia 6 Jurusan Unggulan:</p>
                <ul style="padding-left: 20px; margin-top: 10px;">
                    <li>TKR (Teknik Kendaraan Ringan)</li>
                    <li>TSM (Teknik Sepeda Motor)</li>
                    <li>TKJ (Teknik Komputer dan Jaringan)</li>
                    <li>TAV (Teknik Audio Video)</li>
                    <li>BD (Bisnis Digital)</li>
                    <li>LPS (Layanan Perbankan Syariah)</li>
                </ul>`
        };

        // --- FETCHING DATA ---
        async function fetchSpreadsheetData() {
            try {
                const r = await fetch(API_URL);
                const data = await r.json();
                const gridIds = ['grid-lembaga', 'grid-profil', 'grid-game', 'grid-layanan', 'grid-literasi', 'grid-media'];
                const staticItems = {};
                
                gridIds.forEach(id => {
                    const container = document.getElementById(id);
                    if (container) {
                        staticItems[id] = Array.from(container.querySelectorAll('.static-item'));
                        container.innerHTML = '';
                    }
                });

                gridIds.forEach(id => {
                    const container = document.getElementById(id);
                    if (container && staticItems[id]) {
                        staticItems[id].forEach(item => container.appendChild(item));
                    }
                });

                Object.keys(data).forEach(key => {
                    const item = data[key];
                    const sec = item.SectionID ? item.SectionID.toLowerCase().trim() : "";
                    const targetGridId = `grid-${sec}`;

                    if (item.Title === 'Logo Sekolah' && item.Url) {
                        document.getElementById('mainLogo').innerHTML = `<img src="${item.Url}" style="width:100%; padding:8px; object-fit:contain;">`;
                        return;
                    }

                    const container = document.getElementById(targetGridId);
                    if (container) {
                        const card = document.createElement('div');
                        card.className = 'menu-card';
                        card.innerHTML = `<div class="icon-box"><i class="${item.Icon || 'fa-solid fa-link'}"></i></div><span>${item.Title || key}</span>`;
                        card.onclick = () => item.Url ? window.open(item.Url, '_blank') : openModal(item.Title, "Konten belum tersedia.");
                        container.appendChild(card);
                    }

                    if (item.Thumbnail && item.Thumbnail.startsWith('http')) {
                        const videoList = document.getElementById('video-profil');
                        if (videoList) {
                            const v = document.createElement('div');
                            v.className = 'video-item';
                            v.innerHTML = `<div class="video-thumb"><img src="${item.Thumbnail}"><div class="video-play-btn"><i class="fa-solid fa-play"></i></div></div><div class="video-info">${item.Title}</div>`;
                            v.onclick = () => window.open(item.Url, '_blank');
                            videoList.appendChild(v);
                        }
                    }
                });
            } catch (e) {
                console.error("Error loading data", e);
                showToast("Gagal memuat data dari server.");
            }
        }

        async function fetchJadwalUjian() {
            try {
                const res = await fetch(UJIAN_API_URL);
                ujianData = await res.json();
            } catch (e) { console.error("Error loading exam schedule", e); }
        }

        async function fetchAndShowPTK() {
            openModal('Daftar PTK', 'Memuat data guru...');
            try {
                const response = await fetch(PTK_API_URL);
                const dataGuru = await response.json();
                let html = '<div style="display:grid; gap:10px;">';
                dataGuru.forEach(guru => {
                    html += `<div style="display:flex; align-items:center; gap:12px; background:#f8fbff; padding:10px; border-radius:12px;">
                                <img src="${guru.Foto || ''}" style="width:50px; height:50px; border-radius:8px; object-fit:cover;">
                                <div><h4 style="font-size:14px;">${guru.Nama}</h4><p style="font-size:11px; color:gray;">${guru.Jabatan}</p></div>
                             </div>`;
                });
                document.getElementById('modalBody').innerHTML = html + '</div>';
            } catch (e) { document.getElementById('modalBody').innerHTML = 'Gagal memuat data.'; }
        }
