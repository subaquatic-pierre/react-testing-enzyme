import React from 'react';
import { shallow, mount } from 'enzyme';

import App from './App';
import { findByTestAttr } from '../test/testUtils';
import hookActions from './actions/hookActions'

const mockGetSecretWord = jest.fn()

/**
 * Setup function to create wrapper of App component for use in tests
 * @param {param} secretWord - Secrect word to use within state
 * @returns {ReactWrapper}
 */
const setup = (secretWord = null) => {
  // set get secret word hook to mock fuction
  hookActions.getSecretWord = mockGetSecretWord;

  // mock reducer to define state
  const mockUseReducer = jest.fn()
    .mockReturnValue(
      [
        { secretWord, language: null },
        jest.fn()
      ]
    )

  // set react `useReducer` to mock function
  React.useReducer = mockUseReducer

  // return rull mounted wrapepr to ensure `useEffect` is called
  return mount(<App />)
}

test('renders App component', () => {
  const wrapper = setup('super')
  const component = findByTestAttr(wrapper, 'component-app')
  expect(component.length).toBe(1)
});

describe('`useEffect` on App component mount', () => {
  let wrapper;
  beforeEach(() => {
    mockGetSecretWord.mockReset()
    wrapper = setup()
  })

  it('calls get secret word on first mount', () => {
    expect(mockGetSecretWord).toHaveBeenCalled()
  })

  it('does not call `getSecretWord` on component update', () => {
    // update component to check if only one call get get secret word
    wrapper.mount()
    expect(mockGetSecretWord.mock.calls.length).toBe(1)
  })
})

describe('not null secret word', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup('super')
  })

  it('does render input', () => {
    expect(wrapper.find("[data-test='component-input-container']").exists()).toBe(true)
  })

  it('does not render spinner', () => {
    expect(wrapper.find("[data-test='component-spinner']").exists()).toBe(false)
  })

})

describe('null secret word', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup()
  })

  it('does not render input', () => {
    expect(wrapper.find("[data-test='component-input-container']").exists()).toBe(false)
  })

  it('does render spinner', () => {
    expect(wrapper.find("[data-test='component-spinner']").exists()).toBe(true)
  })

})
