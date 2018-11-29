import React from 'react';
import PropTypes from 'prop-types';
import PostPreview from '../post/postPreview';
import styles from './postList.module.css';

/**
 * List of all post link
 * @class PostsList
 * @param {array} posts
 */
const PostsList = ({ posts }) => {
  return (
    <ul className={styles.container}>
      {
        posts.map(({ node }) => (
          <PostPreview
            key={`post-${node.id}`}
            frontmatter={node.frontmatter}
            excerpt={node.excerpt}
          />
        ))
      }
    </ul>
  );
};

PostsList.propTypes = {
  posts: PropTypes.array
};

PostsList.defaultProps = {
  posts: []
};

export default PostsList;
