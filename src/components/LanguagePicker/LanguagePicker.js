import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    icon: {
        '&:hover': {
            cursor: 'pointer'
        }
    }
})

const LanguagePicker = (props) => {
    const classes = useStyles()

    const languages = [
        { code: 'en', symbol: '🇺🇸' },
        { code: 'emoji', symbol: '😊' },
    ]

    const languageIcons = languages.map(lang => (
        <span
            data-test="component-language-icon"
            key={lang.code}
            onClick={() => props.setLanguage(lang.code)}
            className={classes.icon}
        >
            {lang.symbol}
        </span>
    ))

    return (
        <div data-test="component-language-picker" >
            {languageIcons}
        </div >
    )
}

LanguagePicker.propTypes = {
    setLanguage: PropTypes.func.isRequired
}

export default LanguagePicker;