const shortId = require('shortid')
const LinkModel = require('./link')
const { isWebUri } = require('valid-url')
const errors = require('../utils/errors')

class LinkFactory {
  constructor() {}

  async generate(baseUrl) {
    if(!isWebUri(baseUrl)) throw errors.CODE_INVALID_URI
    return new LinkModel({
      visits: 0,
      baseUrl,
      shortCode: `${shortId.generate()}`,
      createdAt: new Date()
    })
  }
}

module.exports = LinkFactory
