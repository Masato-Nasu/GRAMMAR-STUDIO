const revision = '__GRAMMAR_REVISION__';
const prefix = 'grammar-studio-lessons-';
const cacheName = prefix + revision;
const versioned = path => path + '?v=' + revision;
const assetPaths = [
  versioned('/style.css'), versioned('/app.js'), versioned('/lessons.js'), versioned('/pwa.js'),
  '/manifest.webmanifest', '/icon.svg', '/icon-192.png', '/icon-512.png',
  '/icon-maskable.png', '/apple-touch-icon.png'
];
const assetURLs = new Set(assetPaths.map(path => new URL(path, self.location.origin).href));

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    // Reject redirects or an HTML sign-in page before committing the cache.
    const entries = await Promise.all(['/', ...assetPaths].map(async path => {
      const response = await fetch(path, {cache:'reload', credentials:'same-origin'});
      if (!response.ok || response.redirected || response.headers.get('X-Grammar-Revision') !== revision) {
        throw new Error('Offline lesson file unavailable: ' + path);
      }
      return [path, response];
    }));
    const cache = await caches.open(cacheName);
    try {
      await Promise.all(entries.map(([path, response]) => cache.put(path, response)));
    } catch (error) {
      await caches.delete(cacheName);
      throw error;
    }
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(prefix) && name !== cacheName).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate' && url.pathname === '/') {
    // While online, the site's sign-in and access decisions always win.
    event.respondWith(fetch(request).catch(async () => {
      const cached = await (await caches.open(cacheName)).match('/');
      return cached || Response.error();
    }));
  } else if (assetURLs.has(url.href)) {
    event.respondWith((async () => (await (await caches.open(cacheName)).match(url.pathname + url.search)) || fetch(request))());
  }
});
