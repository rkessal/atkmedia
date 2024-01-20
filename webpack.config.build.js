const path = require('path')

const { merge } = require('webpack-merge')
const config = require('./webpack.config')

console.log('building production')

module.exports = merge(config, {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'public')
  }
})
