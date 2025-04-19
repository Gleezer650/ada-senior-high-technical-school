const CACHE_NAME = 'ada-tech-v1';
const urlsToCache = [
  '/',
  '/home.html',
  '/about.html',
  '/academics.html',
  '/main.css',
  '/mobile.js',
  '/image/school logo.png',
  '/image/science/science1.jpg',
  '/image/science/science2.jpg',
  '/image/science/science3.jpg',
  '/image/business/business1.jpg',
  '/image/business/business2.jpg',
  '/image/business/business3.jpg',
  '/image/home-economics/home1.jpg',
  '/image/home-economics/home2.jpg',
  '/image/home-economics/home3.jpg'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Cache installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - network first, then cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response before using it
        const responseToCache = response.clone();
        
        // Update the cache with the new response
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });
        
        return response;
      })
      .catch(() => {
        // If network fails, try to get from cache
        return caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            // If not in cache, return a fallback response
            if (event.request.mode === 'navigate') {
              return caches.match('/home.html');
            }
          });
      })
  );
}); 