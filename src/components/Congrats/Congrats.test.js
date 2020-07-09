import React from 'react';
import { shallow, mount } from 'enzyme';

import LanguageContext from '../../context/LanguageContext';
import { findByTestAttr, checkProps } from '../../../test/testUtils';
import Congrats from './Congrats';

const defaultProps = { success: false };

/**
* Factory function to create a ShallowWrapper for the Congrats component.
* @function setup
* @param {object} props - Component props specific to this setup.
* @returns {ShallowWrapper}
*/
const setup = ({ success, language }) => {
  success = success || false;
  language = language || 'en'
  return mount(
    <LanguageContext.Provider value={language}>
      <Congrats success={success} />
    </LanguageContext.Provider>
  )
}

describe('render component', () => {
  test('renders without error', () => {
    const wrapper = setup({});
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
  });

  test('renders no text when `success` prop is false', () => {
    const wrapper = setup({ success: false });
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
  });

  test('renders non-empty congrats message when `success` prop is true', () => {
    const wrapper = setup({ success: true });
    const message = findByTestAttr(wrapper, 'congrats-message');
    expect(message.text().length).not.toBe(0);
  });

  test('does not throw warning with expected props', () => {
    const expectedProps = { success: false };
    checkProps(Congrats, expectedProps);
  });
})

describe('language context', () => {
  it('renders correct english text on success', () => {
    const wrapper = setup({ success: true });
    expect(wrapper.find("[data-test='congrats-message']").text()).toBe('Congratulations! You guessed the word!')
  })

  it('renders correct emoji text on success', () => {
    const wrapper = setup({ success: true, language: 'emoji' });
    expect(wrapper.find("[data-test='congrats-message']").text()).toBe('🎯🎉')
  })
})
