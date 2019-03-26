import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import styles from './layout.module.css';


/**
 * Main app layout
 * @param {node} children
 * @returns {node}
 */
const Layout = ({ article, children }) => {
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

            {article.title && <title>{article.title}</title>}
            {article.title && <meta property="og:title" content={article.title} />}
            {article.title && <meta property="og:type" content="article" />}
            {article.title && <meta property="og:type" content="article" />}
            {article.description && <meta name="description" content={article.description} />}
            {article.description && <meta name="og:description" content={article.description} />}
            {article.keywords && <meta name="keywords" lang="en" content={article.keywords} />}

            {/* basic */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            {!article.keywords && <meta name="keywords" lang="en" content={`${keywords} blog, luc-frederic langis, levrault`} />}
            <meta name="author" lang="en" content={author} />
            <meta name="image" content={image} />
            <meta property="og:url" content={metaUrl} />
            {!article.description && <meta property="og:description" content={description} />}
            {!article.description && <meta name="description" content={description} />}
            <meta name="copyright" content={author} />

            {/* apple */}
            <meta name="apple-mobile-web-app-title" content={metaUrl} />
            <meta name="application-name" content={metaUrl} />
            <meta name="theme-color" content="#80d1f7" />

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
  article: PropTypes.object,
  children: PropTypes.node.isRequired
};

Layout.defaultProps = {
  article: {}
};

export default Layout;
