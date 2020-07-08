import { getTranslation } from './string';

const testStringObj = {
    en: {
        submit: 'Submit',
    },
    emoji: {
        submit: '🚀'
    },
    fish: {}
}

describe('string translation', () => {
    // set temporary `console.warn` to skip warning message, reset `console.warn` to original method after each test
    const mockConsoleWarn = jest.fn()
    const tempConsoleWarn = console.warn
    beforeEach(() => {
        console.warn = mockConsoleWarn
    })
    afterEach(() => {
        console.warn = tempConsoleWarn
    })

    it('returns correct englsih word', () => {
        const translation = getTranslation('submit', 'en', testStringObj)
        expect(translation).toBe('Submit')
    })

    it('returns correct emoji word', () => {
        const translation = getTranslation('submit', 'emoji', testStringObj)
        expect(translation).toBe('🚀')
    })

    it('returns english word when word not found', () => {
        const translation = getTranslation('Submit', 'fish', testStringObj)
        expect(translation).toBe('Submit')
    })

    it('returns english word, when language not found', () => {
        const translation = getTranslation('Submit', 'fr', testStringObj)
        expect(translation).toBe('Submit')
    })
})