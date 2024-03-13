const { client } = require('../config/prismic')

async function homeHandler (req, res) {
  const document = await client.getSingle('home')
  console.dir(res.locals.whatsapp, { depth: null })
  res.render('pages/home', {
    document
  })
}

async function cdcHandler (req, res) {
  res.render('pages/cdc', {
    document
  })
}

async function privacidadeHandler (req, res) {
  const document = await client.getSingle('privacy_policy')
  res.render('pages/privacidade', {
    document
  })
}

module.exports = {
  homeHandler,
  cdcHandler,
  privacidadeHandler
}
