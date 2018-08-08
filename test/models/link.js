const { expect } = require('chai')
const LinkModel = require('../../lib/models/link.js')

describe('LinkModel Class', () => {

  it('should throw an error if constructor properties is empty', () => {
    try {
      new LinkModel()
    } catch (error) {
      return true
    }
  })
  it('should throw an error if constructor properties is missing visits', () => {
    try {
      new LinkModel({
        baseUrl: 'http://www.google.com',
        createdAt: new Date(),
        shortCode: 123
      })
    } catch (error) {
      return true
    }
  })
  it('should throw an error if constructor properties is missing baseUrl', () => {
    try {
      new LinkModel({
        createdAt: new Date(),
        shortCode: 123,
        visits: 0
      })
    } catch (error) {
      return true
    }
  })
  it('should throw an error if constructor properties is missing createdAt', () => {
    try {
      new LinkModel({
        baseUrl: 'http://www.google.com',
        shortCode: 123,
        visits: 100
      })
    } catch (error) {
      return true
    }
  })
  it('should throw an error if constructor properties is missing shortCode', () => {
    try {
      new LinkModel({
        baseUrl: 'http://www.google.com',
        createdAt: new Date(),
        visits: 0
      })
    } catch (error) {
      return true
    }
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

  it('should store number of visits', () => {
    const link = new LinkModel({
      baseUrl: 'http://www.google.com',
      createdAt: new Date(),
      shortCode: 123,
      visits: 0
    })
    expect(link.visits).to.be.equal(0)
    link.addVisit()
    expect(link.visits).to.be.equal(1)
    link.addVisit()
    expect(link.visits).to.be.equal(2)
  })
})
