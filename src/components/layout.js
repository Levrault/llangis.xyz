import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import styles from './layout.module.css';


/**
 * Main app layout
 * @param {node} children
 * @returns {node}
 */
const Layout = ({ articleTitle, children }) => {
  return (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title,
            titleTemplate,
            metaUrl,
            description,
            author,
            twitterUsername, 
            image,
            keywords
          }
        }
      }
    `}
      render={(
        { site: {
          siteMetadata: {
            title,
            metaUrl,
            titleTemplate,
            description,
            twitterUsername,
            author,
            image,
            keywords
          }
        } }
      ) => (
        <Fragment>
          <Helmet
            titleTemplate={titleTemplate}
            defaultTitle={title}
            bodyAttributes={{ className: styles.body }}
          >
            <html className={styles.html} lang="en" />

            {articleTitle && <title>{articleTitle}</title>}
            {articleTitle && <meta property="og:title" content={articleTitle} />}
            {articleTitle && <meta property="og:type" content="article" />}

            {/* basic */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="keywords" lang="en" content={keywords} />
            <meta name="author" lang="en" content={author} />
            <meta name="image" content={image} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:description" content={description} />
            <meta name="description" content={description} />

            {/* apple */}
            <meta name="apple-mobile-web-app-title" content={metaUrl} />
            <meta name="application-name" content={metaUrl} />
            <meta name="theme-color" content="#80d1f7" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#80d1f7" />

            {/* twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={twitterUsername} />
            <meta name="twitter:creator" content={twitterUsername} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
          </Helmet>

          <div className={styles.container}>
            {children}
          </div>
        </Fragment>
      )}
    />
  );
};

Layout.propTypes = {
  articleTitle: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Layout;
