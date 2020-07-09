import React from 'react';

import LanguageContext from './context/LanguageContext';
import hookActions from './actions/hookActions';
import Input from './components/Input';
import LanguagePicker from './components/LanguagePicker';

function reducer(state, action) {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload }
    case "setLanguage":
      return { ...state, language: action.payload }
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

  const setLanguage = (langCode) => {
    return dispatch({ type: 'setLanguage', payload: langCode })
  }

  React.useEffect(() => {
    // get secret word from random word server server
    hookActions.getSecretWord(setSecretWord)
    // set language on component mount
    setLanguage('en')
  }, [])

  return (
    <>
      {state &&
        state.secretWord ?
        <div className='container my-5' data-test="component-app">
          <div className='row'></div>
          <h1 className='text-center '>Jotto</h1>
          <LanguageContext.Provider value={state.language}>
            <LanguagePicker setLanguage={setLanguage} />
            <Input secretWord={state.secretWord} />
          </LanguageContext.Provider>
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
