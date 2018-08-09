
const { expect } = require('chai')
const rp = require('request-promise')
const errors = require('../../lib/utils/errors')

const RestServer = require('../../lib/server')
const server = new RestServer(require('../../config'))

describe('API Tests', () => {
  before(() => {
    server.start()
  })

  it('POST /shorten - invalid uri', async () => {
    const response = await rp({
      method:'POST',
      uri: 'http://localhost:9000/shorten',
      json: { baseUrl: 'some_invalid_uri' }
    })
    expect(response.success).to.be.equal(false)
    expect(response).to.have.property('error')
    expect(response.error.code).to.be.equal(errors.CODE_INVALID_URI.code)
    expect(response.error.message).to.be.equal(errors.CODE_INVALID_URI.message)
  })

  it('POST /shorten - valid uri', async () => {
    const response = await rp({
      method:'POST',
      uri: 'http://localhost:9000/shorten',
      json: { baseUrl: 'http://localhost:9000' }
    })
    expect(response.success).to.be.equal(true)
    expect(response).to.have.property('url')
    expect(response).to.have.property('shortCode')
  })

  it('GET /goto/:shortCode - invalid shortCode', async () => {
    const response = await rp({
      method:'GET',
      uri: 'http://localhost:9000/goto/some_invalid_code'
    }).json()
    expect(response.success).to.be.equal(false)
    expect(response).to.have.property('error')
    expect(response.error.code).to.be.equal(errors.CODE_INVALID_SHORT_CODE.code)
    expect(response.error.message).to.be.equal(errors.CODE_INVALID_SHORT_CODE.message)
  })

  it('GET /goto/:shortCode - valid shortCode redirect', async () => {
    const shortCodeResponse = await rp({
      method:'POST',
      uri: 'http://localhost:9000/shorten',
      json: { baseUrl: 'http://localhost:9000' }
    })
    const response = await rp({
      method:'GET',
      uri: `http://localhost:9000/goto/${shortCodeResponse.shortCode}`
    }).json()

    expect(response.success).to.be.equal(true)
    expect(response.message).to.be.equal('You have reached the api!')
  })

  it('GET /stats/:shortCode - invalid shortCode', async () => {
    const response = await rp({
      method:'GET',
      uri: 'http://localhost:9000/stats/some_invalid_code'
    }).json()
    expect(response.success).to.be.equal(false)
    expect(response).to.have.property('error')
    expect(response.error.code).to.be.equal(errors.CODE_INVALID_SHORT_CODE.code)
    expect(response.error.message).to.be.equal(errors.CODE_INVALID_SHORT_CODE.message)
  })

  it('GET /stats/:shortCode - valid shortCode redirect', async () => {
    const shortCodeResponse = await rp({
      method:'POST',
      uri: 'http://localhost:9000/shorten',
      json: { baseUrl: 'http://localhost:9000' }
    })
    let statsResponse = await rp({
      method:'GET',
      uri: `http://localhost:9000/stats/${shortCodeResponse.shortCode}`
    }).json()
    expect(statsResponse.success).to.be.equal(true)
    expect(statsResponse.visits).to.be.equal(0)
    expect(statsResponse.shortCode).to.be.equal(shortCodeResponse.shortCode)

    await rp({
      method:'GET',
      uri: `http://localhost:9000/goto/${shortCodeResponse.shortCode}`
    })

    let statsResponse2 = await rp({
      method:'GET',
      uri: `http://localhost:9000/stats/${shortCodeResponse.shortCode}`
    }).json()

    expect(statsResponse2.success).to.be.equal(true)
    expect(statsResponse2.visits).to.be.equal(1)
    expect(statsResponse2.shortCode).to.be.equal(shortCodeResponse.shortCode)
  })

  after(() => {
    server.stop()
  })
})

