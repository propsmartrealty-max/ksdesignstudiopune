const CACHE_NAME = 'ksdesign-edge-v1';

// Minimal PWA Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Rely on Cloudflare Edge Caching instead of SW caching for optimal performance
  // Just act as a network passthrough to prevent 404 console errors for missing sw.js
  event.respondWith(fetch(event.request));
});
