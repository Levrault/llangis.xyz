import React, { Component } from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { IoLogoTwitter, IoLogoLinkedin, IoLogoGithub, IoLogoGoogle } from 'react-icons/io';
import TRANSITION from '../../animations/cssTransitionState';
import ContactsList from './contactsList';
import ContactContent from './contactContent';
import ContactContext from '../../context/contact';
import styles from './contactme.module.css';

/**
 * Contact me component
 * @class ContactMe
 */
class ContactMe extends Component {
  /**
   * get contacts array
   * @returns {array}
   */
  static getContacts () {
    return [
      {
        color: '#c71610',
        label: 'gmail',
        username: 'lucf.langis@gmail.com',
        url: 'mailto:lucf.langis@gmail.com',
        Icon: IoLogoGoogle
      },
      {
        color: '#0077B5',
        label: 'linkedin',
        username: 'Luc-Frederic Langis',
        url: 'https://www.linkedin.com/in/lucfredericlangis/',
        Icon: IoLogoLinkedin
      },
      {
        color: '#1dcaff',
        label: 'twitter',
        username: '@llangis',
        url: 'https://twitter.com/LFLangis',
        Icon: IoLogoTwitter
      },
      {
        color: '#333333',
        label: 'github',
        username: 'levrault',
        url: 'https://github.com/Levrault',
        Icon: IoLogoGithub
      }
    ];
  }
  /**
  * @contructor
  * @param {object} props
  */
  constructor (props) {
    super(props);
    this.state = {
      contactsFlag: TRANSITION.UNMOUNTED
    };
  }

  /**
   * @param {string} contactsFlag
   * @returns {function}
   */
  handleFlagChange = (contactsFlag) => () => {
    this.setState({
      contactsFlag
    });
  }

  /**
  * Render
  * @returns {node}
  */
  render () {
    const { contactsFlag } = this.state;
    const primaryActions = contactsFlag === TRANSITION.UNMOUNTED ? TRANSITION.ENTER : TRANSITION.UNMOUNTED;
    const contacts = this.constructor.getContacts();
    return (
      <div className={classnames(styles.container, { [styles.active]: contactsFlag !== TRANSITION.UNMOUNTED })}>
        <div className={styles.content}>

          <ContactContent
            active={contactsFlag !== TRANSITION.UNMOUNTED}
            handleChange={this.handleFlagChange(primaryActions)}
          />

          <CSSTransition
            in={contactsFlag === TRANSITION.ENTER}
            classNames={{
              enter: classnames(styles.hiddenFooter, styles.enter),
              enterDone: classnames(styles.hiddenFooter, styles.enterDone),
              exit: classnames(styles.hiddenFooter, styles.exit)
            }}
            timeout={150}
            unmountOnExit
          >
            <div className={styles.hiddenFooter}>
              <ContactsList contacts={contacts} />
            </div>
          </CSSTransition>

        </div>
      </div>
    );
  }
}

export default ContactMe;
