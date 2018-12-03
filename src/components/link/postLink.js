import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styles from './postLink.module.css';

/**
 * @class PostLink
 * @param {string} path
 */
const PostLink = ({ path }) => (
  <div>
    <Link className={styles.content} to={path}>
      Read more
    </Link>
  </div>
);

PostLink.propTypes = {
  path: PropTypes.string.isRequired
};

export default PostLink;
