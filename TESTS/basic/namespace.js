const {
    assert,
    expect
} = require('chai');
const namespace = require('../../namespace/namespace')

describe('Checking Namespace functions', () => {
    describe('Site strings', () => {
        it('Should have global string literals for easy translating - i.e. page title', () => {
            expect(namespace.strings.global.siteTitle).to.equal('Dreaming of Tech')
        })
    })

})