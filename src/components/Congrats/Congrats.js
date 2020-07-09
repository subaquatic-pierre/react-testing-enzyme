import React from 'react';
import PropTypes from 'prop-types';

import LanguageContext from '../../context/LanguageContext';
import { getTranslation } from '../../helpers/string';


/**
 * Functional react component for congratulatory message.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is false).
 */
const Congrats = (props) => {
  const language = React.useContext(LanguageContext)
  if (props.success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {getTranslation('congrats', language)}
        </span>
      </div>
    );
  } else {
    return (
      <div data-test="component-congrats" />
    );
  }
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ success }) => {
  return { success };
};

export default Congrats;
