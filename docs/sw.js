const CACHE_NAME = 'vanguardia-pass-v6';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/styles.css',
  './assets/js/main.js',
  './assets/Img/shield-solid-full.svg'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching essential assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event (Cleanup old caches)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event (Network First, Cache Fallback)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Filtrar solo peticiones HTTP/HTTPS (ignora extensiones del navegador, etc.)
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Clonar y cachear si la respuesta es exitosa (200 OK)
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        // En caso de fallo de red, intentar recuperar desde el cache
        const cachedResponse = await caches.match(event.request, { ignoreSearch: true });

        if (cachedResponse) {
          return cachedResponse;
        }

        // Si fallan tanto la red como el cache, devolvemos una respuesta genérica
        return new Response('Offline: Recurso no disponible', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      })
  );
});
