const { client } = require('../config/prismic')
const PrismicDOM = require('@prismicio/helpers')

async function homeHandler (req, res) {
  const document = await client.getSingle('home')
  const meta = await client.getSingle('meta')
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

async function cdcHandler (req, res) {
  const meta = await client.getSingle('meta')
  const navigation = await client.getSingle('navigation')
  const footer = await client.getSingle('footer')
  res.render('pages/cdc', {
    meta,
    navigation,
    footer
  })
}

async function privacidadeHandler (req, res) {
  const meta = await client.getSingle('meta')
  const navigation = await client.getSingle('navigation')
  const footer = await client.getSingle('footer')
  res.locals = {
    ...res.locals,
    meta,
    navigation,
    footer
  }
  res.render('pages/privacidade', {
    meta,
    navigation,
    footer
  })
}

module.exports = {
  homeHandler,
  cdcHandler,
  privacidadeHandler
}
