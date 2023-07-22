import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
export const useSiteMetadata = () => {
    const data = useStaticQuery(graphql `
    query {
      site {
        siteMetadata {
          title
          description
          twitterUsername
          image
          siteUrl
        }
      }
    }
  `);
    return data.site.siteMetadata;
};
const MetaHead = ({ title, description }) => {
    const { title: defaultTitle, description: defaultDescription, image, siteUrl, twitterUsername, } = useSiteMetadata();
    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image}`,
        twitterUsername,
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("title", null, seo.title),
        React.createElement("meta", { name: "description", content: seo.description }),
        React.createElement("meta", { name: "image", content: seo.image }),
        React.createElement("meta", { name: "twitter:card", content: "summary_large_image" }),
        React.createElement("meta", { name: "twitter:title", content: seo.title }),
        React.createElement("meta", { name: "twitter:description", content: seo.description }),
        React.createElement("meta", { name: "twitter:image", content: seo.image }),
        React.createElement("meta", { name: "twitter:creator", content: seo.twitterUsername })));
};
export default MetaHead;
