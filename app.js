const { app, port } = require('./config/express')
const { homeHandler } = require('./server/handlers')

app.get('/', homeHandler)

app.listen(port, () => {
  console.info(`Server is running on ${port}`)
})

module.exports = app
