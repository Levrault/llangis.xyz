import React from 'react';
import PropTypes from 'prop-types';
import Contact from './contact';
import styles from './contactsList.module.css';

/**
 * @class ContactsList
 * @param {array} contacts
 */
const ContactsList = ({ contacts }) => (
  <div className={styles.container}>
    {contacts.map((contact) => (
      <Contact key={contact.label} {...contact} />
    ))}
  </div>
);

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    Icon: PropTypes.func.isRequired
  }))
};

export default ContactsList;
