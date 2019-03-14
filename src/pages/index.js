import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostsList from '../components/list/postsList';
import RssLink from '../components/link/rssLink';
import Title from '../components/title/title';

/**
 * Index page
 * @class Index
 * @param {array} edges
 */
const Index = ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => {
  const posts = edges.filter(edge => !!edge.node.frontmatter.date);

  return (
    <Layout>
      <Title>
        <Fragment>
          llangis.xyz
          <RssLink />
        </Fragment>
      </Title>
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
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 140)
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
