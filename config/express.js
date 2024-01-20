const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('port', port)
app.use(express.static(path.join(__dirname, '..', 'public')))

module.exports = {
  app,
  port
}
