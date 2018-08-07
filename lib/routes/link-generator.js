
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

  app.get('/goto/:shortCode', (req, res) => {
    let link = linkStore.getLink(req.params.shortCode)
    if(link == null) return res.status(404).json({success: false, error: errors.CODE_INVALID_SHORT_CODE})
    link.addVisit()
    res.redirect(link.baseUrl)
  })

  app.get('/stats/:shortCode', (req, res) => {
    let link = linkStore.getLink(req.params.shortCode)
    if(link == null) return res.status(404).json({success: false, error: errors.CODE_INVALID_SHORT_CODE})
    res.json({success: true, visits: link.visits, shortCode: link.shortCode})
  })
}
