import React from 'react';

import hookActions from './actions/hookActions';
import Input from './components/Input';

function reducer(state, action) {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload }
    default:
      throw new Error(`Invalid action type: ${action.type}`)
  }
}

function App() {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null },
  )

  // set secret word with reducer on getSecretWord response
  const setSecretWord = (secretWord) => {
    return dispatch({ type: 'setSecretWord', payload: secretWord })
  }

  React.useEffect(() => {
    // get secret word from random word server server
    hookActions.getSecretWord(setSecretWord)
  }, [])

  return (
    <>
      {state &&
        state.secretWord ?

        <div className='container' data-test="component-app">
          <Input secretWord={state.secretWord} />
        </div>

        :

        <div data-test='component-spinner'>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
    </>
  );
}

export default App;
