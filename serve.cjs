console.clear()
const path = require('path')
const express = require('express')
const dir = path.join(__dirname, './dist')

const app = express()

app.use(express.static(dir))
app.use((req, res) => {
  res.sendFile(path.join(dir, './index.html'))
})

app.listen(8080, () => {
  console.log('App listening on port 8080...')
})
