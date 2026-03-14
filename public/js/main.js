window.addEventListener('DOMContentLoaded', () => {
    // Cek Login
    if (localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        fetchSpreadsheetData();
    }
    
    // Jalankan Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cek Status Login
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const savedUser = localStorage.getItem('currentUser');

    if (isLoggedIn === 'true') {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        document.getElementById('displayUserName').innerText = savedUser || "User";
        fetchSpreadsheetData(); // Dari api.js
    }

    // 2. Inisialisasi PWA (Service Worker)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .catch(err => console.log("SW Gagal:", err));
    }

    // 3. Update Status Jaringan Pertama Kali
    updateNetwork();
});