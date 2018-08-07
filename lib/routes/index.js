module.exports = app => {
  app.get('/', async (req, res) => {
    res.json({success: true, message: 'You have reached the api!'})
  })
}
