const cacheName = "SESI-Livronautas-1.0";
const contentToCache = [
    "Build/7743ce649f29502d9af8cd6799abb6b3.loader.js",
    "Build/b4787d2aea85dd093c8a34602aaa1a51.framework.js.unityweb",
    "Build/8b4ac47db922f3aeb21e23801d02df76.data.unityweb",
    "Build/fa8d4f58509f8d8a876d687693c7d81e.wasm.unityweb",
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
