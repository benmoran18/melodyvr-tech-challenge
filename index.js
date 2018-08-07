const RestServer = require('./lib/server')
const server = new RestServer(require('./config'))
server.start()
