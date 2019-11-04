import React from 'react';
import avatar from '../../images/avatar.webp';
import styles from './contactContent.module.css';

/**
 * @class ContactContent
 * @param {bool} active
 */
const ContactContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.avatar}>
          <img
            className={styles.image}
            src={avatar}
            alt="picture of Luc-Frederic with an authentic canadian ww2 helmet"
          />
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
    </div>
  );
};

ContactContent.propTypes = {};

export default ContactContent;
