import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../test/testUtils';

import LanguageContext from '../../context/LanguageContext';
import Input from './Input';

const defaultProps = { secretWord: 'super' }

const setup = ({ language, success, secretWord = 'super' }) => {
    language = language || 'en'
    success = success || false;
    return mount(
        <LanguageContext.Provider value={language}>
            <Input secretWord={secretWord} />
        </LanguageContext.Provider>
    )
}

describe('successful render', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = setup({})
    })
    test('renders Input component', () => {
        const component = findByTestAttr(wrapper, 'component-input-container')
        expect(component.length).toBe(1)
    })

    test('correct secret word prop type', () => {
        checkProps(wrapper, defaultProps)
    })

    test('input box no success state', () => {
        expect(findByTestAttr(wrapper, 'component-input-box').length).toBe(1)
    })

    test('submit button box no success state', () => {
        expect(findByTestAttr(wrapper, 'component-input-box').length).toBe(1)
    })
})

describe('state controlled input component', () => {
    const mockEvent = { target: { value: 'super' }, preventDefault: () => { } }

    let wrapper;
    let input;
    beforeEach(() => {
        wrapper = setup({})
        input = findByTestAttr(wrapper, 'component-input-box')
    })

    test('correct value in input on change', () => {
        // simluate change event and check input
        input.simulate('change', mockEvent)
        const newInput = findByTestAttr(wrapper, 'component-input-box')
        expect(newInput.props().value).toBe('super')
    })

    test('`setCurrentGuess` setState hook called with correct argument', () => {
        const setState = jest.fn();
        const useStateSpy = jest.spyOn(React, 'useState')
        useStateSpy.mockImplementation((init) => [init, setState]);

        // simulate input change
        const input = wrapper.find("[data-test='component-input-box']")
        input.props().onChange(mockEvent)
        // expect(setState).toHaveBeenCalledWith(mockEvent.target.value)
    })

    test('submit button click clears input', () => {
        // get button and simulate input change and click
        const button = findByTestAttr(wrapper, 'component-button')
        input.simulate('change', mockEvent)
        button.simulate('click', mockEvent)

        // get updated input
        const newInput = findByTestAttr(wrapper, 'component-input-box')
        expect(newInput.props().value).toBe('')
    })
})

describe('language context', () => {
    let wrapper;

    it('displays correct text for button for english', () => {
        wrapper = setup({})
        expect(wrapper.find("[data-test='component-button']").text()).toBe('Submit')
    })

    it('displays correct text for button for emoji', () => {
        wrapper = setup({ language: 'emoji' })
        expect(wrapper.find("[data-test='component-button']").text()).toBe('🚀')
    })

    it('displays correct text for input for english', () => {
        wrapper = setup({})
        expect(wrapper.find("[data-test='component-input-box']").props().placeholder).toBe('enter guess')
    })

    it('displays correct text for input for emoji', () => {
        wrapper = setup({ language: 'emoji' })
        expect(wrapper.find("[data-test='component-input-box']").props().placeholder).toBe('⌨️🤔')
    })
})

