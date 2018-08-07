const { expect } = require('chai')
const { LinkModel, LinkStoreModel} = require('../../lib/models')

describe('LinkStoreModel Class', () => {
  it('should store links correctly', () => {
    const linkStore = new LinkStoreModel()
    const newLink = new LinkModel().generate('http://www.google.com')
    linkStore.addLink(newLink)
    expect(linkStore.getLink(newLink.shortCode)).to.be.equal(newLink)
  })
})
