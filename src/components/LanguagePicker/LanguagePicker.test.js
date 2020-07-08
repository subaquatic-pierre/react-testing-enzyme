import React from 'react';

import LanguagePicker from './LanguagePicker';
import { shallow } from 'enzyme';

const defaultProps = {
    setLanguage: jest.fn()
}

const setup = (props = defaultProps) => {
    return shallow(<LanguagePicker {...props} />)
}

describe('render', () => {
    let wrapper;

    it('renders without error', () => {
        wrapper = setup()
        expect(wrapper.find("[data-test='component-language-picker']").exists()).toBe(true)
    })

    it('renders language icons', () => {
        wrapper = setup()
        expect(wrapper.find("[data-test='component-language-icon']").length).toBeGreaterThan(0)
    })


})