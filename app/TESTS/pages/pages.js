const {
    assert,
    expect
} = require('chai');
const app = require('../../app')
const Browser = require('zombie')
//const browser = new Browser()
const siteroot = `http://localhost:3000`

process.env.NODE_ENV = 'test'

describe('Home Page', () => {
    before(() => {
        this.server = app.listen(3000)
        this.browser = new Browser({
            site: siteroot
        })
    })

    before((done) => {
        this.browser.visit('/', done)
    })

    it('Should Display my homepage', (done) => {
        assert.ok(this.browser.success)
        expect(this.browser.text('title')).to.equal('Dreaming of Tech')
        expect(this.browser.text('.navbar-brand')).to.equal('Dreaming of Tech')
        done()
    })

    after((done) => {
        this.server.close(done)
    })
})