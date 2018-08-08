const shortId = require('shortid')
const LinkModel = require('./link')

class LinkFactory {
  constructor() {}

  generate(baseUrl) {
    return new LinkModel({
      visits: 0,
      baseUrl,
      shortCode: `${shortId.generate()}_${shortId.generate()}`,
      createdAt: new Date()
    })
  }
}

module.exports = LinkFactory
