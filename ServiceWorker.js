const cacheName = "SESI-Livronautas-1.0";
const contentToCache = [
    "Build/d7391b27f2855938e984cc56b98677a1.loader.js",
    "Build/d59879d5c3cc5f01dc3480cf5161d1b2.framework.js.unityweb",
    "Build/a4bab33f0994ef17ebd21f715bd2dfc9.data.unityweb",
    "Build/10e9bff4265fca22b8d73961b6a8a4b7.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
