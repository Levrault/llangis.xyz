const postCSSConfig = require('./postcss.config');

module.exports = {
  siteMetadata: {
    title: 'llangis.xyz',
    titleTemplate: '%s · Luc-Frederic Langis',
    siteUrl: 'https://llangis.xyz',
    metaUrl: 'llangis.xyz',
    author: 'Luc-Frédéric Langis',
    twitterUsername: '@LFLangis',
    description: 'personal blog',
    image: '../images/favicon.jpg',
    keywords: 'llangis luc-frederic langis react web unity godot krita javascript css front-end'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }

          allSitePage {
            edges {
              node {
                path
              }
            }
          }
      }`
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://llangis.xyz',
        sitemap: 'https://llangis.xyz/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography'
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        ...postCSSConfig
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/post/`,
        name: 'markdown-pages'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Cutive Mono', 'Cutive']
        }
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'llangis.xyz',
        short_name: 'llangis',
        start_url: '/',
        background_color: '#80d1f7',
        theme_color: '#80d1f7',
        display: 'minimal-ui',
        icon: 'src/images/favicon.jpg' // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
};
