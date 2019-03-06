import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './contact.module.css';

/**
 * @class Contact
 * @param {bool}   state
 * @param {string} color
 * @param {string} label
 * @param {string} url
 * @param {string} username
 * @param {function}   Icon
 */
const Contact = ({ color, url, Icon }) => {
  return (
    <Fragment>
      <a className={styles.container} href={url} target="_blank">
        <div className={styles.icon} style={{ background: color }}>
          <Icon />
        </div>
      </a>
    </Fragment>
  );
};

Contact.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired
};

export default Contact;
