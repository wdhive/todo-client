const path = require('path')
const { readFileSync, existsSync, writeFileSync } = require('fs')

console.clear()
const dest = process.argv[2]
const destPath = path.resolve(dest)
const name = process.argv[3]
const jsxFilePath = path.resolve(destPath, name + '.jsx')
const scssFilePath = path.resolve(destPath, name + '.module.scss')
const force = process.argv[3] === '-f'

const template = readFileSync(
  path.resolve('./CreateComponent.jsx'),
  'utf-8'
).replaceAll('NAME', name)

if (!force && (existsSync(jsxFilePath) || existsSync(scssFilePath))) {
  throw new Error('File already exists.')
}

writeFileSync(jsxFilePath, template)
writeFileSync(scssFilePath, '\n')
