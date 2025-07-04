const CACHE_NAME = 'word-spinner-cache-v1';
const urlsToCache = [
  '/word-spinner-react/',
  '/word-spinner-react/index.html',
  '/word-spinner-react/static/js/main.35df2e7a.js',
  '/word-spinner-react/static/css/main.e6833e7f.css',
  '/word-spinner-react/wordGroups.json', // Word lists for offline use
  // Cache all audio files from the public/audio/ directory
  '/word-spinner-react/audio/a.mp3',
  '/word-spinner-react/audio/b.mp3',
  '/word-spinner-react/audio/c.mp3',
  '/word-spinner-react/audio/d.mp3',
  '/word-spinner-react/audio/e.mp3',
  '/word-spinner-react/audio/f.mp3',
  '/word-spinner-react/audio/g.mp3',
  '/word-spinner-react/audio/h.mp3',
  '/word-spinner-react/audio/i.mp3',
  '/word-spinner-react/audio/j.mp3',
  '/word-spinner-react/audio/k.mp3',
  '/word-spinner-react/audio/l.mp3',
  '/word-spinner-react/audio/m.mp3',
  '/word-spinner-react/audio/n.mp3',
  '/word-spinner-react/audio/o.mp3',
  '/word-spinner-react/audio/p.mp3',
  '/word-spinner-react/audio/q.mp3',
  '/word-spinner-react/audio/r.mp3',
  '/word-spinner-react/audio/s.mp3',
  '/word-spinner-react/audio/t.mp3',
  '/word-spinner-react/audio/u.mp3',
  '/word-spinner-react/audio/v.mp3',
  '/word-spinner-react/audio/w.mp3',
  '/word-spinner-react/audio/x.mp3',
  '/word-spinner-react/audio/y.mp3',
  '/word-spinner-react/audio/z.mp3',
  '/word-spinner-react/audio/long_a.mp3',
  '/word-spinner-react/audio/long_e.mp3',
  '/word-spinner-react/audio/long_i.mp3',
  '/word-spinner-react/audio/long_o.mp3',
  '/word-spinner-react/audio/long_u.mp3',
  '/word-spinner-react/audio/start.mp3'
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
