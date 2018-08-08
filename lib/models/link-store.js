
const config = require('../../config')
const store = {}
const errors = require('../utils/errors')

class LinkStore {
  constructor() {}

  async addLink(link) {
    store[link.shortCode] = link
  }

  async getLink(shortCode) {
    let link = store[shortCode]

    if(link == null) throw errors.CODE_INVALID_SHORT_CODE

    if(config.maximumLinkLifeInMilliseconds != null) {
      if(new Date().getTime() - new Date(link.createdAt).getTime() > config.maximumLinkLifeInMilliseconds) {
        return null
      }
    }
    return link
  }

  async deleteLink(shortCode) {
    delete store[shortCode]
  }

  async getAll() {
    // Return a copy of the store so the original can't be edited
    return Object.assign({}, store)
  }
}

module.exports = LinkStore
