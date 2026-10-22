/*
 * Service worker for GT Maskin-demoen. Versjonen settes inn ved bygg (vite.config.js),
 * så hvert bygg får nytt cachenavn og gamle cacher slettes ved activate.
 *
 * - Sidenavigering (HTML): nettverk først. offline.html vises bare når nettet mangler.
 *   HTML legges aldri i cache, så ingen ser en gammel versjon så lenge det er nett.
 * - Filer under /assets/ (hash i navnet): cache først, fylles på ved første henting.
 * - Eksterne kall (Facebook, YouTube, Snapchat, alt utenfor eget opphav): rører vi ikke.
 */
const VERSION = "__GTM_BUILD__";
const CACHE = `gtm-${VERSION}`;
const OFFLINE_URL = "/offline.html";
const PRECACHE = [OFFLINE_URL, "/images/logo/gt-maskin-logo-256.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_URL)));
    return;
  }

  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(CACHE).then((cache) => cache.put(request, copy));
            }
            return response;
          }),
      ),
    );
    return;
  }

  if (PRECACHE.includes(url.pathname)) {
    event.respondWith(caches.match(request).then((cached) => cached || fetch(request)));
  }
});
