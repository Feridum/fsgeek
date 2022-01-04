const path = require("path")

module.exports = {
  siteMetadata: {
    title: `FSGeek`,
    description: `Jestem programistą od kilku lat i pasjonatem nowych rozwiązań webowych. Na blogu staram się nimi bawić i pokazywać jak można je wykorzystać w codziennej pracy`,
    author: `@gatsbyjs`,
    twitter: "@FSGeekk",
    siteUrl: "https://fsgeek.pl/",
    logoUrl: "/logo.png",
    language: "pl",
    fbAppId: "846208848853284"
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-plugin-image',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/avatar.jpg` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        footnotes: true,
        excerpt_separator: `<!--more-->`,
        plugins: [
          {
            resolve: "gatsby-remark-prismjs"
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              related: false,
              noIframeBorder: true,
              containerClass: 'embedVideo-container',
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              quality: 100,
            }
          },
          {
            resolve: `gatsby-remark-images-medium-zoom`, // Important!
            options: {
              background: '#000',
            }

          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts/`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/images/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/wp-content/`
      }
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        develop: process.env.NODE_ENV === `development`,
        tailwind: true, // Enable tailwindcss support
        purgeOnly: ["components/", "styles/"],
        content: [path.join(__dirname, "src/**/!(*.d).{ts,js,jsx,tsx}")]
      }
    },
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleTagManager: {
          trackingId: 'GTM-PBG24GD',
          cookieName: 'gatsby-gdpr-google-tagmanager',
          dataLayerName: 'dataLayer',
        },
        environments: ['production']
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap`,
        excludes: [`/polityka-prywatnosci`],
        query: `
        {
          site {
              siteMetadata {
                title
                description
                siteUrl
              }
          }

          allSitePage {
            nodes {
              path
              pageContext
            }
          }
        }`,
        resolveSiteUrl: ({site}) => site.siteMetadata.siteUrl,
        resolvePages: ({ site, allSitePage }) => allSitePage.nodes.map(node => {
              const date = node.pageContext.dateCreated ? node.pageContext.dateCreated : (new Date()).toISOString();
              return {
                date,
                ...node,
                siteUrl: site.siteMetadata.siteUrl
              }
            }),
        serialize: (page) => {
          return {
            lastmodrealtime: true,
            url: `${page.siteUrl}${page.path}`,
            lastmod: page.date.replace('T', ' '),
            priority: page.path.indexOf('post') === -1 ? 0.5 : 0.8,
            changefreq: `daily`,
          }
        }
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
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
                  url: site.siteMetadata.siteUrl + '/' + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + '/' + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
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
            output: "/index.xml",
            title: "FSGeek blog",
            match: "^/post/",
            language: "pl",
            site_url : "https://fsgeek.pl/",
            image_url : "https://fsgeek.pl/logo.png",
            feed_url: "https://fsgeek.pl/index.xml",
            categories: ['programming', 'webdev']
          }
        ]
      }
    }
  ]
}
