import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MdExpandLess } from 'react-icons/md';
import avatar from '../../images/avatar.jpg';
import PrimaryButton from '../button/primaryButton';
import styles from './contactContent.module.css';

/**
 * @class ContactContent
 * @param {bool} active
 */
const ContactContent = ({ active, handleChange }) => {
  return (
    <div className={classnames(styles.container, { [styles.active]: active })}>
      <div className={styles.content}>
        <div className={styles.avatar}>
          <img className={styles.image} src={avatar} alt="picture of Luc-Frederic with an authentic canadian ww2 helmet" height="225px" width="226px" />
        </div>
        <div className={styles.description}>
          <p className={styles.lead}>
            Luc-Frédéric Langis
          </p>
          <p className={styles.paragraph}>
            At day, I'm a Software Development Engineer - Front End at Splio.
            I work with React and Redux and everything front end related.
          </p>
          <p className={styles.paragraph}>
            At night, I try to create my own video games
            with Unity or Godot.
          </p>
        </div>
      </div>

      <div className={classnames(styles.footer, { [styles.active]: active })}>
        <PrimaryButton
          aria-label="show social link"
          className={styles.primaryButton}
          onClick={handleChange}
        >
          {!active ? 'Contact me' : <MdExpandLess />}
        </PrimaryButton>
      </div>
    </div>
  );
};

ContactContent.propTypes = {
  active: PropTypes.bool,
  handleChange: PropTypes.func.isRequired
};

export default ContactContent;
