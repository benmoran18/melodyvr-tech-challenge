
const { LinkStoreModel } = require('../models')
const linkStore = new LinkStoreModel()
const errors = require('../utils/errors')

module.exports = app => {
  app.get('/goto/:shortCode', (req, res) => {
    let link = linkStore.getLink(req.params.shortCode)
    if(link == null) return res.status(404).json({success: false, error: errors.CODE_INVALID_SHORT_CODE})
    link.addVisit()
    res.redirect(link.baseUrl)
  })
}
