
const { LinkFactoryModel, LinkStoreModel } = require('../models')
const linkStore = new LinkStoreModel()
const config = require('../../config')
const linkFactoryModel = new LinkFactoryModel()

module.exports = app => {
  app.post('/shorten', async (req, res) => {
    try {
      const link = await linkFactoryModel.generate(req.body.baseUrl)
      await linkStore.addLink(link)
      res.json({success:true, url:config.defaultUrl || req.get('host'), shortCode: link.shortCode})
    } catch (error) {
      res.json({success: false, error})
    }
  })
}
