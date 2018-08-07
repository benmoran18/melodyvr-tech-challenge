
const linkGeneratorRoutes = require('./link-generator')

module.exports = app => {

  app.use(require('body-parser').json())

  app.get('/', async (req, res) => {
    res.json({success: true, message: 'You have reached the api!'})
  })
  linkGeneratorRoutes(app)
}
