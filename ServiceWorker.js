const cacheName = "SESI-Livronautas-1.0";
const contentToCache = [
    "Build/72d217417fae5cfdfe006f7fdd408b6e.loader.js",
    "Build/05e915e68c57a009ddc25d2b210f45aa.framework.js.unityweb",
    "Build/a5cd1e1f237281a5fe0cd2005f67bdc4.data.unityweb",
    "Build/333c505c4661b02814acc6b161b12e23.wasm.unityweb",
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
