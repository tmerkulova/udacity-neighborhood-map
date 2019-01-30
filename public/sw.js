var staticCacheName = 'neighborhood-map1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', () => {
  self.clients.matchAll({ type: 'window' }).then(windowClients => {
    for (let windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      windowClient.navigate(windowClient.url);
    }
  });
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

