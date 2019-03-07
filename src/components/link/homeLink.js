import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import RssLink from '../link/rssLink';
import styles from './homeLink.module.css';

/**
 * Redirect to homepage
 * @class HomeLink
 */
const HomeLink = () => (
  <Link className={styles.container} to="/">
    <Fragment>
      llangis.xyz
      <RssLink />
    </Fragment>
  </Link>
);

export default HomeLink;
