
const { LinkStoreModel } = require('../models')
const linkStore = new LinkStoreModel()

module.exports = app => {
  app.get('/stats/:shortCode', async (req, res) => {
    try {
      let link = await linkStore.getLink(req.params.shortCode)
      res.json({success: true, visits: link.visits, shortCode: link.shortCode})
    } catch (error) {
      res.json({success: false, error: error})
    }
  })
}
