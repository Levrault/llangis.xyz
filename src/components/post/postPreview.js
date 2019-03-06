import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styles from './postPreview.module.css';

/**
 * @class PostPreview
 * @param {object} data
 */
const PostPreview = ({ excerpt, frontmatter }) => {
  const { title, date, path } = frontmatter;

  return (
    <li className={styles.container}>
      <div className={styles.content}>
        <Link className={styles.link} to={path}>{title}</Link>
        <div className={styles.date}>{date}</div>
        <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: excerpt }} />
      </div>
    </li>
  );
};

PostPreview.propTypes = {
  data: PropTypes.shape({
    frontmatter: PropTypes.object.isRequired
  })
};

export default PostPreview;
