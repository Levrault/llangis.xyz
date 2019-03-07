import React, { useState } from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { IoLogoTwitter, IoLogoLinkedin, IoLogoGithub, IoIosMail } from 'react-icons/io';
import TRANSITION from '../../animations/cssTransitionState';
import ContactsInfoList from './contactsInfoList';
import ContactContent from './contactContent';
import styles from './contactBlock.module.css';


/**
 * Hook test
 * @returns {node}
 */
const ContactBlock = () => {
  const [contactsFlag, setContactsFlag] = useState(TRANSITION.UNMOUNTED);
  const primaryActions = contactsFlag === TRANSITION.UNMOUNTED ? TRANSITION.ENTER : TRANSITION.UNMOUNTED;
  const contacts = [
    {
      color: '#c71610',
      label: 'gmail',
      username: 'lucf.langis@gmail.com',
      url: 'mailto:lucf.langis@gmail.com',
      Icon: IoIosMail
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

  return (
    <div className={classnames(styles.container, { [styles.active]: contactsFlag !== TRANSITION.UNMOUNTED })}>
      <div className={styles.content}>

        <ContactContent
          active={contactsFlag !== TRANSITION.UNMOUNTED}
          handleChange={() => setContactsFlag(primaryActions)}
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
          <ContactsInfoList contacts={contacts} />
        </CSSTransition>

      </div>
    </div>
  );
};

export default ContactBlock;
