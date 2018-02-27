const fs = require('fs')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV
const env = ['production'].indexOf(NODE_ENV) === -1 ? 'development' : NODE_ENV

const config = { env }
const root = path.join(__dirname, env)
const _config = fs.readdirSync(root).reduce((_config, filename) => {
  const key = filename.replace(/\.js$/, '')
  _config[key] = require(path.join(root, filename))
  return _config
}, {})

module.exports = Object.assign(config, _config)
