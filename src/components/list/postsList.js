import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PostPreview from '../post/postPreview';
import styles from './postList.module.css';
import ContactMe from '../contact/contactme';

/**
 * List of all post link
 * @class PostsList
 * @param {array} posts
 */
const PostsList = ({ posts }) => (
  <Fragment>
    <ContactMe />
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
  </Fragment>
);

PostsList.propTypes = {
  posts: PropTypes.array
};

PostsList.defaultProps = {
  posts: []
};

export default PostsList;
