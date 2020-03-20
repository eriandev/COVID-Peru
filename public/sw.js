const staticCache = 'static-cache';

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(staticCache).then(cache => {
            return cache.addAll([
            './',
            './index.html',
            './manifest.json',
            './css/global.css',
            './css/leaflet.css',
            './main.js',
            './images/deaths.webp',
            './images/infected.webp',
            './images/recovered.webp',
            './images/world.webp',
            './images/deaths.png',
            './images/infected.png',
            './images/recovered.png',
            './images/world.png',
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(staticCache)
            .then(cache => cache.match(event.request, { ignoreSearch: true }))
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
