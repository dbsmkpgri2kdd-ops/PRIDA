let ujianSedangBerjalan = false;
let examTimerInterval = null;

async function enterExamMode() {
    const el = document.documentElement;
    if (el.requestFullscreen) await el.requestFullscreen();
}

function startExamTimer(duration) {
    // Logika timer ada di sini...
}

function scanBarcode() {
    // Logika QR Scanner ada di sini...
}