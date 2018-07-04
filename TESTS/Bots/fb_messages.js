const {expect} = require('chai')
const {describe, it} = require('mocha')
const fbMessages = require('../../bots/fb_messages')

describe('Messages', () => {
  it('Return a chuck norris joke', (done) => {
    expect(fbMessages.chuckNorris.text).to.equal('boom')
    done()
  })
})
