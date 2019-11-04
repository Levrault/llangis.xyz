import React from 'react';
import RssLink from '../link/rssLink';
import HomeLink from '../link/homeLink';
import styles from './articleHeader.module.css';

/**
 * Article header with link to home and rss
 * @returns {node}
 */
const ArticleHeader = () => {
  return (
    <div className={styles.container}>
      <RssLink />
      <HomeLink />
    </div>
  );
};

export default ArticleHeader;
