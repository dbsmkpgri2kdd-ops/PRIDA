const CACHE_NAME = 'prida-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  // Tambahkan CDN agar bisa diakses offline jika pernah dimuat sebelumnya
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js'
];

// ... (Bagian Install & Activate tetap sama)

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 1. Strategi: Network First (Khusus Data Dinamis)
  if (url.pathname.endsWith('.html') || url.href.includes('script.google.com')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Opsional: Simpan hasil terbaru ke cache sebagai cadangan
          const resClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 2. Strategi: Cache First (Aset Statis & Library)
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});