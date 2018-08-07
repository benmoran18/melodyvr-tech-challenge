
const config = require('../../config')

class LinkStore {
  constructor() {
    this._store = {}
  }

  addLink(link) {
    this._store[link.shortCode] = link
  }

  getLink(shortCode) {
    let link = this._store[shortCode]
    if(config.maximumLinkLifeInMilliseconds != null) {
      if(new Date().getTime() - new Date(link.createdAt).getTime() > config.maximumLinkLifeInMilliseconds) {
        return null
      }
    }
    return link
  }

  deleteLink(shortCode) {
    delete this._store[shortCode]
  }

  getAll() {
    return this._store
  }
}

module.exports = LinkStore
