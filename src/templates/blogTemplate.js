import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import HomeLink from '../components/link/homeLink';
import ContactMe from '../components/contact/contactme';

/**
 * Blog template
 * @class BlogTemplate
 * @param {object} data
 */
export default function BlogTemplate ({ data }) {
  const { markdownRemark } = data;
  const { frontmatter: { title, date }, html } = markdownRemark;
  return (
    <Layout articleTitle={title}>
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
      <ContactMe />
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
      }
    }
  }
`;
