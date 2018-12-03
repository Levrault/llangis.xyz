import React from 'react';
import { Link } from 'gatsby';
import styles from './homeLink.module.css';

/**
 * Redirect to homepage
 * @class HomeLink
 */
const HomeLink = () => (
  <Link className={styles.container} to="/">
      llangis.xyz
  </Link>
);

export default HomeLink;
