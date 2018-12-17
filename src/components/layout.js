import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import PageContext from '../context/page';
import Menu from './navigation/menu';
import styles from './layout.module.css';

/**
 * Main app layout
 * @param {node} children
 * @returns {node}
 */
class Layout extends Component {
  /**
  * @contructor
  * @param {object} props
  */
  constructor (props) {
    super(props);
    this.state = {
      hasScrollBar: true
    };
  }

  /**
   * Show/hide scrollbar
   * @param {bool} hasScrollBar
   */
  setScrollbarVisibility = (hasScrollBar) => {
    this.setState({
      hasScrollBar
    });
  }

  /**
  * Render
  * @returns {node}
  */
  render () {
    const { articleTitle, children } = this.props;
    const { hasScrollBar } = this.state;
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
            twitterUsername, 
            image
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
              image
            }
          } }
        ) => (
          <Fragment>
            <Helmet
              titleTemplate={titleTemplate}
              defaultTitle={title}
              bodyAttributes={{ className: styles.body }}
            >
              <html className={classnames(styles.html, { [styles.inactive]: !hasScrollBar })} lang="en" />

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

            <PageContext.Provider value={{ setScrollbarVisibility: this.setScrollbarVisibility }}>
              <Menu />
            </PageContext.Provider>

            <div className={styles.container}>
              {children}
            </div>
          </Fragment>
        )}
      />
    );
  }
}

Layout.propTypes = {
  articleTitle: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Layout;
