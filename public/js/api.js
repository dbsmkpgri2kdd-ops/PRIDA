const KELULUSAN_API = 'https://script.google.com/macros/s/AKfycbwE4oaM8yqhsHdyL6aEA4b0y-Z_V-UBpVw7RsJg0oBQeouffCS1W8yEORXBPnE4u7oHyg/exec';
const API_URL = 'https://script.google.com/macros/s/AKfycbzdUXE8vqAH7g2wa-XnvQWZm1-4cXxMlOjlxsUAufOhjx8OcMfcYe2U8OTa_nKxmsxu/exec';
const PTK_API_URL = 'https://script.google.com/macros/s/AKfycbwvjXmZX0lRmFifHixi1WTvxc2V5kmbLSQrkmXcLutEicV_UeTqzq1C2zQk6ZLKTVRg/exec';
const UJIAN_API_URL = 'https://script.google.com/macros/s/AKfycbxUHb3xhYk1w47vDI-iidkLcqLgQeldIgsYhNnfLAdDnsfVtPW4HjD7vLznmrB3EOaG/exec';

const DYNAMIC_DATA = {
    'Sejarah Lembaga': `... isi sejarah ...`,
    'Identitas Sekolah': `... isi identitas ...`
};

async function fetchSpreadsheetData() {
    try {
        const r = await fetch(API_URL);
        const data = await r.json();
        // Logika render grid di sini...
    } catch (e) { console.error("API Error", e); }
}
