const CACHE_NAME = 'word-spinner-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js', // Adjust based on your build output
  '/static/js/0.chunk.js',
  '/static/js/bundle.js',
  '/wordGroups.json', // Word lists for offline use
  // Cache all audio files from the public/audio/ directory
  '/audio/a.mp3',
  '/audio/b.mp3',
  '/audio/c.mp3',
  '/audio/d.mp3',
  '/audio/e.mp3',
  '/audio/f.mp3',
  '/audio/g.mp3',
  '/audio/h.mp3',
  '/audio/i.mp3',
  '/audio/j.mp3',
  '/audio/k.mp3',
  '/audio/l.mp3',
  '/audio/m.mp3',
  '/audio/n.mp3',
  '/audio/o.mp3',
  '/audio/p.mp3',
  '/audio/q.mp3',
  '/audio/r.mp3',
  '/audio/s.mp3',
  '/audio/t.mp3',
  '/audio/u.mp3',
  '/audio/v.mp3',
  '/audio/w.mp3',
  '/audio/x.mp3',
  '/audio/y.mp3',
  '/audio/z.mp3',
  '/audio/long_a.mp3',
  '/audio/long_e.mp3',
  '/audio/long_i.mp3',
  '/audio/long_o.mp3',
  '/audio/long_u.mp3',
  '/audio/start.mp3'
];

// Install event: Cache the specified assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching assets');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Error caching assets:', err))
  );
});

// Fetch event: Serve cached assets if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if available, otherwise fetch from network
        return response || fetch(event.request).catch(() => {
          // Optional: Provide a fallback for failed fetches
          console.error('Fetch failed; returning offline page instead.');
        });
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
