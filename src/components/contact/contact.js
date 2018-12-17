import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { MdChevronRight } from 'react-icons/md';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import ContactContext from '../../context/contact';
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
const Contact = ({ color, label, url, username, Icon }) => {
  return (
    <ContactContext.Consumer>
      {({ state }) => (
        <Fragment>
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
        </Fragment>
      )}
    </ContactContext.Consumer>
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
