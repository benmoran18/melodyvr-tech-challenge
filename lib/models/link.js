const shortId = require('shortid')

class Link {

  constructor(options) {
    if(options != null) {
      if(Number.isInteger(options.visits))      this._visits = options.visits
      if(options.baseUrl != null)               this._baseUrl = options.baseUrl
      if(options.shortCode != null)             this._shortCode = options.shortCode
      if(Date.parse(options.createdAt))         this._createdAt= options.createdAt
    }
  }

  get visits() { return this._visits }
  get baseUrl() { return this._baseUrl }
  get shortCode() { return this._shortCode }
  get createdAt() { return this._createdAt }

  set visits(visits) { this._visits = visits }
  set baseUrl(baseUrl) { this._baseUrl = baseUrl }
  set shortCode(shortCode) { this._shortCode = shortCode }
  set createdAt(createdAt) { this._createdAt = createdAt }

  generate(baseUrl) {
    this._visits = 0
    this._baseUrl = baseUrl
    this._shortCode = shortId.generate()
    this._createdAt= new Date()

    return this
  }
}

module.exports = Link