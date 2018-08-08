const { expect } = require('chai')
const { LinkFactoryModel } = require('../../lib/models')
const linkFactoryModel = new LinkFactoryModel()
const maxNumberOfUniqueLinkModels = 10000

describe('LinkFactoryModel', () => {

  it('should generate links correctly', () => {
    const newLink = linkFactoryModel.generate('http://www.google.com')
    expect(newLink).to.have.property('visits')
    expect(newLink).to.have.property('baseUrl')
    expect(newLink).to.have.property('shortCode')
    expect(newLink).to.have.property('createdAt')
  })

  it(`should generate ${maxNumberOfUniqueLinkModels} unique LinkModels`, () => {
    const LinkModels = {}
    for(let i = 0; i < maxNumberOfUniqueLinkModels; i++) {
      let newLinkModel = linkFactoryModel.generate('http://www.google.com')
      if(LinkModels[newLinkModel.shortCode] != null) {
        return false
      }

      LinkModels[newLinkModel.shortCode] = 1
    }
  })
})
