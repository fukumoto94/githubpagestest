const cacheName = "SESI-Livronautas-1.0";
const contentToCache = [
    "Build/51a862798ee59665a405a570ac68c961.loader.js",
    "Build/8ec19d15e2919201a797d8613e72ba29.framework.js.unityweb",
    "Build/73e8b5f0574cd07584e252a65320fd1d.data.unityweb",
    "Build/5249e3a0d6ac01b52686c3a32e590559.wasm.unityweb",
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
