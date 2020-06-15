const path = require("path")

module.exports = {
  siteMetadata: {
    title: `FSGeek`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    twitter: 'FSGeekk',
    siteUrl: 'https://fsgeek.pl'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
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
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        commonmark: true,
        footnotes: true,
        pedantic: true,
        excerpt_separator: `<!--more-->`,
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs'
          }
        ]
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        develop:  process.env.NODE_ENV === `development`,
        tailwind: true, // Enable tailwindcss support
        purgeOnly: ["components/", "styles/"],
        content: [path.join(__dirname, "src/**/!(*.d).{ts,js,jsx,tsx}")],
      },
    },
  ],
}
