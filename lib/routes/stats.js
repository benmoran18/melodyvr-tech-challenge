
const { LinkStoreModel } = require('../models')
const linkStore = new LinkStoreModel()
const errors = require('../utils/errors')

module.exports = app => {
  app.get('/stats/:shortCode', (req, res) => {
    let link = linkStore.getLink(req.params.shortCode)
    if(link == null) return res.status(404).json({success: false, error: errors.CODE_INVALID_SHORT_CODE})
    res.json({success: true, visits: link.visits, shortCode: link.shortCode})
  })
}
