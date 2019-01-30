var staticCacheName = 'neighborhood-map';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll([
        '../src',
      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('restaurants-') &&
            cacheName != staticCacheName;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(async function (response) {
        if (typeof response !== 'undefined') {
          return response;
        } else {
          const response = await fetch(event.request);
          let responseClone = response.clone();
          caches.open(staticCacheName).then(function (cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        }
      })
  );
});

