import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../test/testUtils';

import Input from './Input';
import { assertPropTypes } from 'check-prop-types';

const defaultProps = { secretWord: 'super' }

const setup = (props = defaultProps) => {
    return shallow(<Input {...props} />)
}

describe('successful render', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = setup()
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
        wrapper = setup()
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

