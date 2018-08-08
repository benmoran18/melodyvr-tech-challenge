
const { LinkFactoryModel, LinkStoreModel } = require('../models')
const linkStore = new LinkStoreModel()
const errors = require('../utils/errors')
const config = require('../../config')
const linkFactoryModel = new LinkFactoryModel()

module.exports = app => {
  app.post('/shorten', (req, res) => {
    const link = linkFactoryModel.generate(req.body.baseUrl)
    linkStore.addLink(link)
    res.json({success:true, url:config.defaultUrl || req.get('host'), shortCode: link.shortCode})
  })
}
