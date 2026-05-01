const CACHE_NAME = "pwa-v1";

const FILES = [
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});

// THIS PART FIXES iPhone OFFLINE
self.addEventListener("fetch", (e) => {
  if (e.request.mode === "navigate") {
    e.respondWith(caches.match("./index.html"));
    return;
  }

  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
