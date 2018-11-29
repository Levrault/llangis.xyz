import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import PostLink from "../components/link/post-link";
import Layout from '../components/layout';

/**
 * Index page
 * @class Index
 * @param {array} edges
 */
const Index = ({ data: { allMarkdownRemark: { edges } } }) => {
  const posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout>
      <div>{posts}</div>
    </Layout>
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired
};

export default Index;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`;
