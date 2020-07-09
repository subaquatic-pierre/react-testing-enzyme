import React from 'react';
import PropTypes from 'prop-types';

import LanguageContext from '../../context/LanguageContext'
import { getTranslation } from '../../helpers/string';

const Input = ({ secretWord }) => {
    const language = React.useContext(LanguageContext)
    const [currentGuess, setCurrentGuess] = React.useState('')

    const handleInputChange = ({ target }) => {
        setCurrentGuess(target.value)
    }

    const handleSubmitClick = (e) => {
        e.preventDefault()
        // TODO: call guessWord action
        setCurrentGuess('')
    }

    return (
        <div data-test="component-input-container" >
            <form className="form-check-line my-5 mx-auto w-50" >
                <div className="row">
                    <div className="col-8">
                        <input
                            data-test="component-input-box"
                            className="form-control"
                            placeholder={language && getTranslation('guessInputPlaceholder', language)}
                            name="input"
                            value={currentGuess}
                            onChange={(event) => handleInputChange(event)}
                        />
                    </div>
                    <div className="col">
                        <button
                            data-test="component-button"
                            className="btn btn-primary form-control"
                            type="submit"
                            onClick={(e) => handleSubmitClick(e)}
                        >
                            {language && getTranslation('submit', language)}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

Input.propTypes = {
    secretWord: PropTypes.string.isRequired
}

export default Input;
