const postCSSConfig = require('./postcss.config');

module.exports = {
  siteMetadata: {
    title: 'llangis.xyz',
    titleTemplate: '%s · Luc-Frédéric Langis',
    siteUrl: 'https://llangis.xyz',
    metaUrl: 'llangis.xyz',
    author: 'Luc-Frédéric Langis',
    twitterUsername: '@LFLangis',
    description: 'Blog of a Front End Software Development Engineer and amateur video game dev',
    image: '/icons/icon-48x48.png',
    keywords: 'llangis luc-frédéric luc-frederic langis react web unity godot javascript css front-end gamedev godotengine'
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
            resolve: 'gatsby-remark-images'
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
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-136537073-1'
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
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }]
                });
              });
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: {frontmatter: { draft: { ne: true } }}
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
            output: '/rss.xml',
            title: 'llangis\'s developer posts'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'llangis.xyz',
        short_name: 'langis',
        start_url: '/',
        background_color: '#02a3ee',
        theme_color: '#80d1f7',
        display: 'standalone',
        icon: 'src/images/favicon.jpg',
        crossOrigin: 'use-credentials'
      }
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['pico8/*']
      }
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            'X-Frame-Options: SAMEORIGIN'
          ]
        },
        mergeSecurityHeaders: true
      }
    }
  ]
};
