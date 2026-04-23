const CACHE_NAME = 'degz-pulse-v1';

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './cashier.html',
                './manifest.json',
                './logo.png'
            ]);
        })
    );
});

self.addEventListener('fetch', e => {
    if (e.request.url.includes('script.google.com') || e.request.url.includes('world.openfoodfacts.org')) {
        return fetch(e.request); 
    }
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request);
        })
    );
});
