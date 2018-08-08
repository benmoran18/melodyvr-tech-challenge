const { expect } = require('chai')
const { LinkFactoryModel, LinkStoreModel} = require('../../lib/models')
const linkFactoryModel = new LinkFactoryModel()
const linkStore = new LinkStoreModel()
const newLink = linkFactoryModel.generate('http://www.google.com')

describe('LinkStoreModel Class', () => {

  it('should return undefined if link doesn not exist', () => {
    expect(linkStore.getLink('some_short_code')).to.be.equal(undefined)
  })

  it('should store links correctly by shortCode', () => {
    linkStore.addLink(newLink)
    expect(linkStore.getLink(newLink.shortCode)).to.be.equal(newLink)
  })

  it('should return local store variable on getAll call', () => {
    let localStore = linkStore.getAll()
    expect(localStore[newLink.shortCode]).to.be.equal(newLink)
  })

  it('should delete links correctly by shortCode', () => {
    linkStore.deleteLink(newLink.shortCode)
    expect(linkStore.getLink(newLink.shortCode)).to.be.equal(undefined)
  })

  it('should not retrieve link if has reached timeout in config file', () => {
    const config = require('../../config')
    config.maximumLinkLifeInMilliseconds = 10
    const LinkStoreModel2 = require('../../lib/models').LinkStoreModel
    let linkStoreModel2 = new LinkStoreModel2()
    linkStoreModel2.addLink(newLink)
    expect(linkStoreModel2.getLink(newLink.shortCode)).to.be.equal(null)
  })
})
