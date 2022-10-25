import axios from 'axios'

const getNotCachedFiles = async () => {
  const { data } = await axios.get('/mappings.all.json')
  const files = data.map((file) => {
    if (file === 'index.html') return '/'
    return `/${file}`
  })

  const notCachedFiles = []
  for (let file of files) {
    if (await caches.match(file)) continue
    notCachedFiles.push(file)
  }
  return notCachedFiles
}

const getNotCachedRes = async (responses) => {
  const notCachedRes = []
  for (let res of responses) {
    if (await caches.match(res.url)) continue
    notCachedRes.push(res)
  }
  return notCachedRes
}

export default async () => {
  const notCachedFiles = await getNotCachedFiles()
  const fetchFiles = notCachedFiles.map((file) => fetch(file))
  const responses = await Promise.all(fetchFiles)
  const notCachedRes = await getNotCachedRes(responses)

  if (notCachedRes.length) {
    const cache = await caches.open('runtime-cache')
    for (let res of notCachedRes) {
      await cache.put(res.url, res)
    }
  }
}
