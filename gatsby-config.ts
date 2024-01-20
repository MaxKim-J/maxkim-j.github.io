import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: '김맥스 블로그',
    siteUrl: `https://maxkim-j.github.io`,
    twitterUsername: `@max_kim_dev`,
    image: '/thumbnail.png',
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-image',
    'gatsby-plugin-pnpm',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',
    'gatsby-transformer-sharp',
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
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            output: "/rss.xml",
            title: "Max Kim Blog RSS Feed",
            match: "^/posts/",
            link: "https://feeds.feedburner.com/gatsby/blog",
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { category: { ne: null } } }
                ) {
                  nodes {
                    id
                    slug
                    frontmatter {
                      title
                      description
                      date
                      category
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { site, allMdx } }:any) => {
              return allMdx.nodes.map((node:any) => ({
                  title: node.frontmatter.title,
                  description: node.frontmatter.description,
                  date: node.frontmatter.date,
                  url:  encodeURI(site.siteMetadata.siteUrl + '/posts/' + node.slug),
                  guid: encodeURI(site.siteMetadata.siteUrl + '/posts/' + node.slug),
              }))
            },
          },
        ],
      },
    },
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
        path: './src/assets/images/',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/contents`,
        name: `contents`,
      },
    },
  ],
};

export default config;
