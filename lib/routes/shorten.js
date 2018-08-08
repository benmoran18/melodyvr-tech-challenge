
const { LinkModel, LinkStoreModel } = require('../models')
const linkStore = new LinkStoreModel()
const errors = require('../utils/errors')
const config = require('../../config')

module.exports = app => {
  app.post('/shorten', (req, res) => {
    const link = new LinkModel().generate(req.body.baseUrl)
    linkStore.addLink(link)
    res.json({success:true, url:config.defaultUrl || req.get('host'), shortCode: link.shortCode})
  })
}
