const PREFIX = 'arabic-creator-studio-shell-';
const CACHE = PREFIX + 'v3.0.0';
const SHELL = ['./','./index.html','./style.css','./core.js','./app.js','./video.js','./media-store.js','./ai.js','./install.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const URLS = new Set(SHELL.map(path => new URL(path, self.registration.scope).href));
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL.map(path => new Request(path, {cache: 'reload'})))));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const u = new URL(event.request.url);
  if (u.origin !== self.location.origin || !u.href.startsWith(self.registration.scope)) return;
  if (event.request.mode === 'navigate' && (u.pathname === new URL('./', self.registration.scope).pathname || u.pathname === new URL('./index.html', self.registration.scope).pathname)) {
    event.respondWith(caches.open(CACHE).then(cache => cache.match(new URL('./index.html', self.registration.scope).href)).then(response => response || fetch(event.request))); return;
  }
  if (URLS.has(u.href)) event.respondWith(caches.open(CACHE).then(cache => cache.match(event.request)).then(response => response || fetch(event.request)));
});
