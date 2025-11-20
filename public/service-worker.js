// public/service-worker.js
const CACHE_NAME = 'pesqueiros-sp-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  // URLs de assets locais (suas fotos)
  '/images/foto1.webp',
  '/images/foto2.webp',
  '/images/foto3.webp',
  '/images/foto4.webp',
  '/images/foto5.webp',
  '/images/foto6.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});