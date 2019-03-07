import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PostPreview from '../post/postPreview';
import styles from './postList.module.css';
import ContactBlock, { ContactBlockHook } from '../contact/contactBlock';

/**
 * List of all post link
 * @class PostsList
 * @param {array} posts
 */
const PostsList = ({ posts }) => (
  <Fragment>
    <ContactBlock />
    <ContactBlockHook />
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
