import React from 'react';
import { IoLogoTwitter, IoLogoLinkedin, IoLogoGithub, IoIosMail } from 'react-icons/io';
import ContactsInfoList from './contactsInfoList';
import ContactContent from './contactContent';
import styles from './contactBlock.module.css';


/**
 * Hook test
 * @returns {node}
 */
const ContactBlock = () => {
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
    <div className={styles.container}>
      <div className={styles.content}>
        <ContactContent />
        <ContactsInfoList contacts={contacts} />
      </div>
    </div>
  );
};

export default ContactBlock;
