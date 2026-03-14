let currentTabIndex = 0;
const sectionIds = ['profil', 'layanan', 'literasi', 'media'];

function toggleSidebar() {
    const s = document.getElementById('sidebar');
    const o = document.getElementById('sidebarOverlay');
    s.classList.toggle('active');
    o.style.display = s.classList.contains('active') ? 'block' : 'none';
}

function showSection(id, el) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    el.classList.add('active');
}

function openModal(title, content) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalBody').innerHTML = content;
    document.getElementById('contentModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('contentModal').style.display = 'none';
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerText = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

function updateNetwork() {
    const status = document.getElementById('networkStatus');
    if (navigator.onLine) {
        status.innerText = "Online";
        status.className = "profile-network online";
    } else {
        status.innerText = "Offline";
        status.className = "profile-network offline";
    }
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('userAvatar');
        output.style.backgroundImage = `url(${reader.result})`;
        output.innerHTML = ""; // Hapus icon user
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Deteksi perubahan jaringan
window.addEventListener('online', updateNetwork);
window.addEventListener('offline', updateNetwork);