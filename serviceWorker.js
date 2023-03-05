const myCache = "cache";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(myCache).then((cache) => {
      cache.addAll(["/", "index.html"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function (response) {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(myCache).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.add(
        keys
          .filter((key) => key !== myCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});