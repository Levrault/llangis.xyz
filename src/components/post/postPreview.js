import React from 'react';
import PropTypes from 'prop-types';
import PostLink from '../link/postLink';
import styles from './postPreview.module.css';
import Img from 'gatsby-image';

/**
 * @class PostPreview
 * @param {object} data
 */
const PostPreview = ({ excerpt, frontmatter }) => {
  const { title, date, thumbnail } = frontmatter;

  console.log('frontmatter', frontmatter); //TODO: to remove
  return (
    <li className={styles.container}>
      <div className={styles.thumbnail}>
        <Img fluid={thumbnail.childImageSharp.fluid} className={styles.image} />
        <div className={styles.placeholder} />
      </div>
      <div className={styles.content}>
        <div className={styles.date}>{date}</div>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: excerpt }} />
        <div className={styles.link}>
          <PostLink {...frontmatter} />
        </div>
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
