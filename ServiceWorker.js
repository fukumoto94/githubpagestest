const cacheName = "SESI-Livronautas-1.0";
const contentToCache = [
    "Build/b84f214d49d8c700cf9dc8c04e646e3c.loader.js",
    "Build/8ec19d15e2919201a797d8613e72ba29.framework.js.unityweb",
    "Build/8a54ad93ead228cc93a3dd4ce68583d1.data.unityweb",
    "Build/ceea0b59d6e3488f16fe1208ecd0401c.wasm.unityweb",
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
