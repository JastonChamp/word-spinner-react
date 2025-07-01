const CACHE_NAME = 'word-spinner-cache-v1';
const BASE_PATH = self.location.pathname.replace(/\/service-worker\.js$/, '');
const urlsToCache = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/static/js/main.chunk.js`, // Adjust based on your build output
  `${BASE_PATH}/static/js/0.chunk.js`,
  `${BASE_PATH}/static/js/bundle.js`,
  `${BASE_PATH}/wordGroups.json`, // Word lists for offline use
  // Cache all audio files from the public/audio/ directory
  `${BASE_PATH}/audio/a.mp3`,
  `${BASE_PATH}/audio/b.mp3`,
  `${BASE_PATH}/audio/c.mp3`,
  `${BASE_PATH}/audio/d.mp3`,
  `${BASE_PATH}/audio/e.mp3`,
  `${BASE_PATH}/audio/f.mp3`,
  `${BASE_PATH}/audio/g.mp3`,
  `${BASE_PATH}/audio/h.mp3`,
  `${BASE_PATH}/audio/i.mp3`,
  `${BASE_PATH}/audio/j.mp3`,
  `${BASE_PATH}/audio/k.mp3`,
  `${BASE_PATH}/audio/l.mp3`,
  `${BASE_PATH}/audio/m.mp3`,
  `${BASE_PATH}/audio/n.mp3`,
  `${BASE_PATH}/audio/o.mp3`,
  `${BASE_PATH}/audio/p.mp3`,
  `${BASE_PATH}/audio/q.mp3`,
  `${BASE_PATH}/audio/r.mp3`,
  `${BASE_PATH}/audio/s.mp3`,
  `${BASE_PATH}/audio/t.mp3`,
  `${BASE_PATH}/audio/u.mp3`,
  `${BASE_PATH}/audio/v.mp3`,
  `${BASE_PATH}/audio/w.mp3`,
  `${BASE_PATH}/audio/x.mp3`,
  `${BASE_PATH}/audio/y.mp3`,
  `${BASE_PATH}/audio/z.mp3`,
  `${BASE_PATH}/audio/long_a.mp3`,
  `${BASE_PATH}/audio/long_e.mp3`,
  `${BASE_PATH}/audio/long_i.mp3`,
  `${BASE_PATH}/audio/long_o.mp3`,
  `${BASE_PATH}/audio/long_u.mp3`,
  `${BASE_PATH}/audio/start.mp3`
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
