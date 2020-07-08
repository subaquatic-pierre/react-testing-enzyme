const languageStrings = {
    en: {
        congrats: 'Congratulations! You guessed the word!',
        submit: 'Submit',
        guessPrompt: 'Try to guess the secret word!',
        guessInputPlaceholder: 'enter guess',
        guessColumnHeader: 'Guessed Words',
        guessedWords: 'Guesses',
        matchingLettersColumnHeader: 'Matching Letters',
    },
    emoji: {
        congrats: '🎯🎉',
        submit: '🚀',
        guessPrompt: '🤔🤫🔤',
        guessInputPlaceholder: '⌨️🤔',
        guessedWords: '🤷‍🔤',
        guessColumnHeader: '🤷‍',
        matchingLettersColumnHeader: '✅',
    }
}

/**
 * @function - A function to translate a word to the requested language code
 * @param {param} word - A word given which is to be translated to the given code
 * @param {param} lang - language code used to translate the word to
 * @param {param} langObj - Language object used to map the lanuage code to the corresponding word
 * @returns {String} - Translated word
 */
export const getTranslation = (word, lang, langObj = languageStrings) => {
    if (!langObj[lang] || !langObj[lang][word]) {
        console.warn(`[${word}] not found in [${lang}]`)
        return word
    }
    return langObj[lang][word]
}