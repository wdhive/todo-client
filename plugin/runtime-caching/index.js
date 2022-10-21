import fs from 'fs'

export default function runtimeCaching() {
  const name = 'PWA-runtime-caching'
  const isProdMode = process.env.NODE_ENV === 'production'
  if (!isProdMode) return { name }

  const rootFile = /src\/index\.jsx$/
  const swJsInput = new URL('./sw.js', import.meta.url)
  const swJsOutput = 'sw.js'
  const pushCode =
    '\n\n' +
    fs.readFileSync(new URL('./push-code.js', import.meta.url), 'utf-8')

  return {
    name,
    transform(src, id) {
      if (rootFile.test(id)) {
        return {
          code: src + pushCode,
          map: null,
        }
      }
    },

    writeBundle(a) {
      fs.writeFileSync(
        a.dir + '/' + swJsOutput,
        fs
          .readFileSync(swJsInput, 'utf8')
          .replace(/(^\/\/ RANDOM: ).*/m, `// RANDOM: ${Math.random()}`)
      )
    },
  }
}
