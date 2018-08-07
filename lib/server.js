const express = require('express')
const routes = require('./routes')

class RestServer {
  constructor(config) {
    this._config = config
    this._app = express()
    routes(this._app)
  }

  start() {
    this._app.listen(this._config.port)
  }
}

module.exports = RestServer
