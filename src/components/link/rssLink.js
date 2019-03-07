import React from 'react';
import { IoLogoRss } from 'react-icons/io';
import styles from './rssLink.module.css';

/**
 * Redirect to rss feed
 * @class RssLinkt
 */
const RssLink = () => (
  <a className={styles.container} href="/rss.xml" target="_blank" title="open rss feed xml">
    <IoLogoRss />
  </a>
);

export default RssLink;
