const { client } = require('../config/prismic')
const PrismicDOM = require('@prismicio/helpers')

async function homeHandler (req, res) {
  const meta = await client.getSingle('meta')
  const document = await client.getSingle('home')
  const navigation = await client.getSingle('navigation')
  const footer = await client.getSingle('footer')
  res.render('pages/home', {
    meta,
    document,
    navigation,
    footer,
    PrismicDOM
  })
}

module.exports = {
  homeHandler
}
