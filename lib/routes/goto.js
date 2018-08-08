
const { LinkStoreModel } = require('../models')
const linkStore = new LinkStoreModel()

module.exports = app => {
  app.get('/goto/:shortCode', async (req, res) => {
    try {
      let link = await linkStore.getLink(req.params.shortCode)
      link.addVisit()
      res.redirect(link.baseUrl)
    } catch (error) {
      return res.json({success: false, error})
    }
  })
}
