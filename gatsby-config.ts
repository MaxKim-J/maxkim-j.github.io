import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: '김맥스 블로그',
    siteUrl: 'https://maxkim-j.github.io',
    twitterUsername: `@max_kim_dev`,
    image: '/thumbnail.png',
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-pnpm',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-132859535-2',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          'gatsby-remark-gifs',
          'gatsby-remark-autolink-headers',
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              theme: 'a11y-dark',
            },
          },
        ],
        plugins: [`gatsby-remark-images`],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/contents`,
        name: `contents`,
      },
    },
  ],
};

export default config;