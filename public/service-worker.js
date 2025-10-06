self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('pedidos-v1').then(cache => {
      return cache.addAll([
        './',
        'index.html',
        'logo.jpeg',
        'manifest.json',
        // Agrega aquí otros archivos estáticos si es necesario
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
