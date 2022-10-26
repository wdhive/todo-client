console.clear()
const fs = require('fs')
const path = require('path')
const { default: ls } = require('node-ls-files')

const excludedFiles = ['yarn.lock']
const excludeFolder = ['node_modules', '.git', 'dist', 'public', '.vscode']

const files = ls.sync(path.resolve('.'), {
  excludeFolder,
  filter: (file) => !excludedFiles.includes(file.base),
})

const linesArray = files.map((file) => {
  const data = fs.readFileSync(file, 'utf-8')
  return data.match(/\n/gim)?.length || 1
})

const linesCount = linesArray.reduce((acc, curr) => acc + curr)
console.log('Total', linesCount, 'lines of code in', files.length, 'files.')
