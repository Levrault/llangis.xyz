import React from 'react';
import PropTypes from 'prop-types';
import styles from './cartridge.module.css';

/**
 * Redirect to homepage
 * @class Cartridge
 * @param {string} src
 */
const Cartridge = ({ src }) => (
  <iframe src={`https://www.lexaloffle.com/${src}`} className={styles.container} allowFullScreen width="621" height="513" />
);


Cartridge.propTypes = {
  src: PropTypes.string.required
};


export default Cartridge;

