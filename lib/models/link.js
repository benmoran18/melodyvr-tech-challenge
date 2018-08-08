class Link {

  constructor(options) {
    if(options == null || typeof options !== 'object') throw new Error('Invalid LinkModel constructor')

    if(!Number.isInteger(options.visits))
      throw new Error(`Invalid LinkModel constructor property: visits. Expected number but got ${options.visits}`)

    if(options.baseUrl == null)
      throw new Error(`Invalid LinkModel constructor property: baseUrl. Expected uri but got ${options.visits}`)

    if(options.shortCode == null)
      throw new Error(`Invalid LinkModel constructor property: shortCode. Expected string but got ${options.visits}`)

    if(!Date.parse(options.createdAt))
      throw new Error(`Invalid LinkModel constructor property: createdAt. Expected date but got ${options.visits}`)

    this.visits = options.visits
    this.baseUrl = options.baseUrl
    this.shortCode = options.shortCode
    this.createdAt= options.createdAt
  }

  get visits() { return this._visits }
  get baseUrl() { return this._baseUrl }
  get shortCode() { return this._shortCode }
  get createdAt() { return this._createdAt }

  set visits(visits) { this._visits = visits }
  set baseUrl(baseUrl) { this._baseUrl = baseUrl }
  set shortCode(shortCode) { this._shortCode = shortCode }
  set createdAt(createdAt) { this._createdAt = createdAt }

  addVisit() {
    this.visits++
  }
}

module.exports = Link
