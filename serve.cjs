console.clear()
const shell = require('child_process')
const path = require('path')
const express = require('express')

shell.execSync('yarn build')

const dir = path.join(__dirname, './dist')
const app = express()

app.use(express.static(dir))
app.use((req, res) => {
  res.sendFile(path.join(dir, './index.html'))
})

app.listen(3000, () => {
  console.log('App listening on port 3000...')
})
