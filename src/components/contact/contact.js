import React from 'react';
import PropTypes from 'prop-types';
import { MdChevronRight } from 'react-icons/md';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
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
const Contact = ({ state, color, label, url, username, Icon }) => {
  return (
    <CSSTransition
      in={state}
      classNames={{
        enter: classnames(styles.container, styles.enter),
        enterDone: classnames(styles.container, styles.enterDone),
        exit: classnames(styles.container, styles.exit)
      }}
      key={label}
      timeout={1000}
      unmountOnExit
    >
      <a className={styles.container} href={url} target="_blank">
        <div className={styles.icon} style={{ background: color }}>
          <Icon />
        </div>
        <div className={styles.content}>
          <span className={styles.label}>
            {label}
          </span>
          <span className={styles.username}>
            {username}
          </span>
        </div>
        <div className={styles.action}>
          <MdChevronRight />
        </div>
      </a>
    </CSSTransition>
  );
};

Contact.propTypes = {
  state: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired
};

export default Contact;
