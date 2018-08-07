
class LinkStore {
  constructor() {
    this._store = {}
  }

  addLink(link) {
    this._store[link.shortCode] = link
  }

  getLink(shortCode) {
    return this._store[shortCode]
  }

  deleteLink(shortCode) {
    delete this._store[shortCode]
  }
}
