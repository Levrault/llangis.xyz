import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostsList from '../components/list/postsList';
import Title from '../components/title/title';

/**
 * Index page
 * @class Index
 * @param {array} edges
 */
const Index = ({ data: { allMarkdownRemark: { edges } } }) => {
  const posts = edges.filter(edge => !!edge.node.frontmatter.date);

  return (
    <Layout>
      <Title>llangis.xyz</Title>
      <PostsList posts={posts} />
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
          excerpt(pruneLength: 140)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title,
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
