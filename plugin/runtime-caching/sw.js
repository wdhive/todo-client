const staticCache = 'static-files'
const dynamicCache = 'dynamic-files'
const assets = ['/manifest.json', '/sw.js', '/icon.ico']

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .then(() => caches.open(staticCache).then(cache => cache.addAll(assets)))
  )
})

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return (
        cacheRes ||
        fetch(evt.request).then(fetchRes => {
          return caches.open(dynamicCache).then(cache => {
            cache.put(evt.request.url, fetchRes.clone())
            return fetchRes
          })
        })
      )
    })
  )
})
