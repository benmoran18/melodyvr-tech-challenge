const { expect } = require('chai')
const { LinkModel, LinkStoreModel} = require('../../lib/models')
const linkStore = new LinkStoreModel()
const newLink = new LinkModel().generate('http://www.google.com')

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
})
