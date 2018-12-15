import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Menu from './navigation/menu';
import './layout.css';

/**
 * Main app layout
 * @param {node} children
 * @returns {node}
 */
const Layout = ({ articleTitle, children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title,
            titleTemplate,
            metaUrl,
            description,
            twitterUsername, 
            image
          }
        }
      }
    `}
    render={({ site: { siteMetadata: { title, metaUrl, titleTemplate, description, twitterUsername, image } } }) => (
      <Fragment>
        <Helmet
          titleTemplate={titleTemplate}
          defaultTitle={title}
        >
          <html lang="en" />

          {articleTitle && <title>{articleTitle}</title>}
          {articleTitle && <meta property="og:title" content={articleTitle} />}

          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          <meta name="image" content={image} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={metaUrl} />
          <meta property="og:description" content={description} />

          <meta name="apple-mobile-web-app-title" content={metaUrl} />
          <meta name="application-name" content={metaUrl} />
          <meta name="theme-color" content="#80d1f7" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#80d1f7" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content={twitterUsername} />
          <meta name="twitter:creator" content={twitterUsername} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={image} />
        </Helmet>

        <Menu />

        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0
          }}
        >
          {children}
        </div>
      </Fragment>
    )}
  />
);

Layout.propTypes = {
  articleTitle: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Layout;
