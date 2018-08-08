const { expect } = require('chai')
const { LinkFactoryModel } = require('../../lib/models')
const linkFactoryModel = new LinkFactoryModel()
const maxNumberOfUniqueLinkModels = 10000
const errors = require('../../lib/utils/errors')

describe('LinkFactoryModel', () => {

  it('should generate links correctly', async () => {
    const newLink = await linkFactoryModel.generate('http://www.google.com')
    expect(newLink).to.have.property('visits')
    expect(newLink).to.have.property('baseUrl')
    expect(newLink).to.have.property('shortCode')
    expect(newLink).to.have.property('createdAt')
  })

  it('should throw an error if uri is not valid', async () => {
    try {
      await linkFactoryModel.generate('some_invalid_uri')
    } catch (error) {
      expect(error).to.be.equal(errors.CODE_INVALID_URI)
    }
  })

  it(`should generate ${maxNumberOfUniqueLinkModels} unique LinkModels`, async () => {
    const LinkModels = {}
    for(let i = 0; i < maxNumberOfUniqueLinkModels; i++) {
      let newLinkModel = await linkFactoryModel.generate('http://www.google.com')
      if(LinkModels[newLinkModel.shortCode] != null) {
        return false
      }

      LinkModels[newLinkModel.shortCode] = 1
    }
  })
})
