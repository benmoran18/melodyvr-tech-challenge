const { expect } = require('chai')
const LinkModel = require('../../lib/models/link.js')
const maxNumberOfUniqueLinkModels = 1000

describe('LinkModel Class', () => {

  it('should have not properties if constructor is empty', () => {
    let newLink = new LinkModel()
    expect(LinkModel.baseUrl).to.be.equal(undefined)
    expect(LinkModel.createdAt).to.be.equal(undefined)
    expect(LinkModel.shortCode).to.be.equal(undefined)
    expect(LinkModel.visits).to.be.equal(undefined)
  })

  it('should have properties set from constructor', () => {
    let newDate = new Date()
    let newLink = new LinkModel({
      baseUrl: 'http://www.google.com',
      createdAt: newDate,
      shortCode: 123,
      visits: 100
    })
    expect(newLink.baseUrl).to.be.equal('http://www.google.com')
    expect(newLink.createdAt).to.be.equal(newDate)
    expect(newLink.shortCode).to.be.equal(123)
    expect(newLink.visits).to.be.equal(100)
  })

  it(`should generate ${maxNumberOfUniqueLinkModels} unique LinkModels`, () => {
    const LinkModels = {}
    for(let i = 0; i < maxNumberOfUniqueLinkModels; i++) {
      let newLinkModel = new LinkModel().generate('http://www.google.com')
      if(LinkModels[newLinkModel.shortCode] != null) {
        return false
      }

      LinkModels[newLinkModel.shortCode] = 1
    }
  })
})
