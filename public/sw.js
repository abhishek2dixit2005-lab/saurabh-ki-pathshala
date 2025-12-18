const CACHE_NAME = "pathshala-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/register.html",
  "/admin.html",
  "/student.html",
  "/css/style.css",
  "/js/script.js",
  "/js/admin.js",
  "/js/student.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
