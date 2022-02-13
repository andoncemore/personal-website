/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Adit Dhanushkodi`,
    description: `Adit Dhanushkodi's personal website, featuring documentation of design work.`,
    author: `Adit Dhanushkodi`
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: 0,
        duration: 800
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `page`,
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `case-studies`,
        path: `${__dirname}/content/case-studies`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `portfolio`,
        path: `${__dirname}/content/portfolio`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sketchbook`,
        path: `${__dirname}/content/sketchbook`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-responsive-iframe`,
          "gatsby-remark-unwrap-images",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1080,
              linkImagesToOriginal: false,
              showCaptions: ['title'],
              markdownCaptions: false
            },
          },
          {
            resolve: `gatsby-remark-image-attributes`,
            options: {
              dataAttributes: true
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Adit Dhanushkodi`,
        short_name: `Adit Dhanushkodi`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#4154E8`,
        display: `minimal-ui`,
        icon: `src/icon.png`
      }
    },
    'gatsby-plugin-breakpoints',
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`
  ],
}
