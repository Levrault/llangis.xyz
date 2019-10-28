import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import HomeLink from '../components/link/homeLink';
import ContactBlock from '../components/contact/contactBlock';
import Cartridge from '../components/cartridge/cartridge';

/**
 * Blog template
 * @class BlogTemplate
 * @param {object} data
 */
export default function BlogTemplate ({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, frontmatter: { title, date, cartridge }, html } = markdownRemark;
  console.log('cartridge', cartridge); //TODO: to remove
  return (
    <Layout article={frontmatter}>
      <HomeLink />
      <div className="blog-post">
        <h1>{title}</h1>
        <h2>{date}</h2>
        {cartridge && <Cartridge src={cartridge} />}
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
        cartridge
      }
    }
  }
`;
