const { client } = require('../config/prismic')
const PrismicDOM = require('@prismicio/helpers')

async function middleware (req, res, next) {
  const preloader = await client.getSingle('preloader')
  const meta = await client.getSingle('meta')
  const navigation = await client.getSingle('navigation')
  const footer = await client.getSingle('footer')
  const whatsapp = await client.getSingle('whatsapp')

  res.locals = {
    ...res.locals,
    preloader,
    meta,
    navigation,
    footer,
    whatsapp,
    PrismicDOM
  }

  return next()
}

module.exports = {
  middleware
}
