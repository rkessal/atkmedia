const { app, port } = require('./config/express')
const { client } = require('./config/prismic')
const PrismicDOM = require('@prismicio/helpers')

app.get('/', async (req, res) => {
  const meta = await client.getSingle('meta')
  const document = await client.getSingle('home')
  const navigation = await client.getSingle('navigation')
  const footer = await client.getSingle('footer')
  res.locals.meta = meta
  res.locals.document = document
  res.locals.navigation = navigation
  res.locals.footer = footer
  res.locals.PrismicDOM = PrismicDOM
  console.log(res.locals.footer.data.body)
  res.render('pages/home')
})

app.listen(port, () => {
  console.log(`Example app listening on ${port}`)
})
