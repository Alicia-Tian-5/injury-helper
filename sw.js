// Keeps a copy of the site on the phone so it opens without internet.
// Every request tries the network first, so a new version shows as soon as
// there is a connection; the saved copy is only used when there is none.
// Firebase calls (sign-in, shared cases) and the cover photos are not saved.

const CACHE = 'injury-helper';

// Saved when the site is first opened, so it works offline right away.
const PAGE_FILES = [
  './',
  'index.html',
  'triage.js',
  'share.js',
  'chat.js',
  'recovery-log.js',
  'rehab-plan.js',
  'account.js',
  'install.js',
  'knowledge.js',
  'city-hospitals.js',
  'firebase-app.js',
  'firebase-cases.js',
  'firebase-account.js',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/apple-touch-icon.png'
];
// The Firebase library, so a sign-in kept on this phone still opens the
// recovery log offline. Saved if it can be; the site works without it.
const LIBRARY_FILES = [
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js'
];
// Other sites whose files are worth saving when they pass by: the fonts.
const SAVED_HOSTS = ['www.gstatic.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => Promise.all([
    cache.addAll(PAGE_FILES.map((file) => new Request(file, {cache: 'reload'}))),
    ...LIBRARY_FILES.map((url) => cache.add(url).catch(() => undefined))
  ])).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

function isSaved(url) {
  return url.origin === self.location.origin || SAVED_HOSTS.includes(url.hostname);
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || !isSaved(url)) return;
  event.respondWith(fetch(request).then((response) => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(request, copy));
    }
    return response;
  }).catch(() => caches.match(request, {ignoreSearch: url.origin === self.location.origin}).then((saved) => {
    if (saved) return saved;
    // Any page address (with or without index.html) opens the saved page.
    if (request.mode === 'navigate') return caches.match('index.html');
    return Response.error();
  })));
});
