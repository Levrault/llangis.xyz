import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './cartridge.module.css';

/**
 * Redirect to homepage
 * @class Cartridge
 * @param {string} src
 */
const Cartridge = ({ src }) => (
  <Fragment>
    <div className={styles.mobile}>
      <p>
        You can play Sieur Lacassagne Dungeon on your mobile device by clicking on the folling link
        <a className={styles.text} href={`/pico8/${src}/index.html`} target="_blank">
        Sieur Lacassagne Dungeon
        </a>
      </p>
    </div>
    <iframe src={`/pico8/${src}/index.html`} className={styles.p8container} allowFullScreen />
  </Fragment>
);


Cartridge.propTypes = {
  src: PropTypes.string.required
};


export default Cartridge;

