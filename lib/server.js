const express = require('express')
const routes = require('./routes')

class RestServer {
  constructor(config) {
    this._config = config
    this._app = express()
    this._app.use(require('body-parser').json())
    routes(this._app)
  }

  start() {
    this._app.listen(this._config.port)
  }
}

module.exports = RestServer
