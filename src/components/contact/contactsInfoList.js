import React from 'react';
import PropTypes from 'prop-types';
import ContactInfo from './contactInfo';
import styles from './contactsInfoList.module.css';

/**
 * @class ContactsList
 * @param {array} contacts
 */
const ContactsInfoList = ({ contacts }) => (
  <div className={styles.container}>
    {contacts.map((contact) => (
      <ContactInfo key={contact.label} {...contact} />
    ))}
  </div>
);

ContactsInfoList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    Icon: PropTypes.func.isRequired
  }))
};

export default ContactsInfoList;
