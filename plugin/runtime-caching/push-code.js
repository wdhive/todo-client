;(async () => {
  try {
    await navigator.serviceWorker.register('/sw.js')
  } catch {}
})()
