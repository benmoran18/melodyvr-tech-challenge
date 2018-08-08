
const shortenRoutes = require('./shorten')
const gotoRoutes = require('./goto')
const statsRoutes = require('./stats')

module.exports = app => {
  shortenRoutes(app)
  gotoRoutes(app)
  statsRoutes(app)
  app.get('/', async (req, res) => {
    res.json({success: true, message: 'You have reached the api!'})
  })
}
