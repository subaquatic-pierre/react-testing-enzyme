import moxios from 'moxios';

import { getSecretWord } from './hookActions';
import { italics } from 'prop-types/lib/ReactPropTypesSecret';

describe('`getSecretWord`', () => {
    beforeEach(() => {
        moxios.install()
    })
    afterEach(() => {
        moxios.uninstall()
    })

    test('set secret word called with response', async () => {
        // create secret word and mock function
        const secretWord = 'super'
        const mockSetSecretWord = jest.fn()

        // setup moxios to handle axios request
        moxios.wait(() => {
            let request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: secretWord
            })
        })

        // call get secret word
        await getSecretWord(mockSetSecretWord)

        expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord)
    })


})