import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './contactInfo.module.css';

/**
 * @class Contact
 * @param {string} color
 * @param {string} label
 * @param {string} url
 * @param {string} username
 * @param {function}   Icon
 */
const ContactInfo = ({ color, url, Icon, label, username }) => {
  return (
    <Fragment>
      <a className={styles.container} href={url} target="_blank" title={`${label} - ${username}`}>
        <div className={styles.icon} style={{ background: color }}>
          <Icon />
        </div>
      </a>
    </Fragment>
  );
};

ContactInfo.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired
};

export default ContactInfo;
