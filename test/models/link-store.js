const { expect } = require('chai')
const { LinkFactoryModel, LinkStoreModel} = require('../../lib/models')
const linkFactoryModel = new LinkFactoryModel()
const linkStore = new LinkStoreModel()
const errors = require('../../lib/utils/errors')
let newLink = null

describe('LinkStoreModel Class', () => {

  before(async () => {
    newLink = await linkFactoryModel.generate('http://www.google.com')
  })

  it('should return undefined if link doesn not exist', async () => {
    try {
      await linkStore.getLink('some_short_code')
    } catch (error) {
      expect(error).to.be.equal(errors.CODE_INVALID_SHORT_CODE)
    }
  })

  it('should store links correctly by shortCode', async () => {
    await linkStore.addLink(newLink)
    expect(await linkStore.getLink(newLink.shortCode)).to.be.equal(newLink)
  })

  it('should return local store variable on getAll call', async () => {
    let localStore = await linkStore.getAll()
    expect(localStore[newLink.shortCode]).to.be.equal(newLink)
  })

  it('should delete links correctly by shortCode', async () => {
    await linkStore.deleteLink(newLink.shortCode)
    expect(await linkStore.getAll()[newLink.shortCode]).to.be.equal(undefined)
  })

  it('should not retrieve link if has reached timeout in config file', async () => {
    const config = require('../../config')
    config.maximumLinkLifeInMilliseconds = -1
    const LinkStoreModel2 = require('../../lib/models').LinkStoreModel
    let linkStoreModel2 = new LinkStoreModel2()
    try {
      await linkStoreModel2.addLink(newLink)
      await linkStoreModel2.getLink(newLink.shortCode)
      return false
    } catch (error) {
      expect(error).to.be.equal(errors.CODE_INVALID_SHORT_CODE)
    }
  })

  it('should retrieve link if within config timeout', async () => {
    const config = require('../../config')
    config.maximumLinkLifeInMilliseconds = 10000000
    const LinkStoreModel2 = require('../../lib/models').LinkStoreModel
    let linkStoreModel2 = new LinkStoreModel2()
    try {
      await linkStoreModel2.addLink(newLink)
      let link = await linkStoreModel2.getLink(newLink.shortCode)
      expect(await linkStore.getLink(newLink.shortCode)).to.be.equal(newLink)
    } catch (error) {
      return false
    }
  })
})
