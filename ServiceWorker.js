const cacheName = "SESI-Livronautas-1.0";
const contentToCache = [
    "Build/42208ae720bf218908d2578c4b2a1ed8.loader.js",
    "Build/9268f865df39f0129eab8922763beaea.framework.js.unityweb",
    "Build/8f77f0254f007f2635e98dc71bb4aeca.data.unityweb",
    "Build/9d94dcdeeab0f151f5cc48d9d02273ce.wasm.unityweb",
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
