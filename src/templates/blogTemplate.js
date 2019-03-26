import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import HomeLink from '../components/link/homeLink';
import ContactBlock from '../components/contact/contactBlock';

/**
 * Blog template
 * @class BlogTemplate
 * @param {object} data
 */
export default function BlogTemplate ({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, frontmatter: { title, date }, html } = markdownRemark;
  return (
    <Layout article={frontmatter}>
      <HomeLink />
      <div className="blog-post">
        <h1>{title}</h1>
        <h2>{date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <HomeLink />
      <ContactBlock />
    </Layout>
  );
}

BlogTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
        keywords
      }
    }
  }
`;
