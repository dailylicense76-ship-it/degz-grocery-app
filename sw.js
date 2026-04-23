const CACHE_NAME = 'degz-pulse-v1';

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './cashier.html',
                './manifest.json'
            ]);
        })
    );
});

self.addEventListener('fetch', e => {
    if (e.request.url.includes('script.google.com')) {
        return fetch(e.request); // Huwag i-cache ang Cloud Database
    }
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request);
        })
    );
});
