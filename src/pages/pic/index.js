import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { styled } from '../../styles/stitches';
import galleryStyle from '../../styles/gallery';
import Footer from '../../components/@layout/Footer';
import Header from '../../components/@layout/Header/Header';
import MainLayout from '../../components/@layout/MainLayout';
import MetaHead from '../../components/@fundamentals/MetaHead';
export default function GalleryPage({ data }) {
    galleryStyle();
    const { body } = data.mdx;
    const { title } = data.mdx.frontmatter;
    return (React.createElement(MainLayout, { header: React.createElement(Header, null), footer: React.createElement(Footer, null) },
        React.createElement(StyledName, null, title),
        React.createElement(MDXRenderer, null, body)));
}
export const Head = () => {
    return React.createElement(MetaHead, { title: "\uAE40\uB9E5\uC2A4 \uBE14\uB85C\uADF8 | gallery", description: "\uCC0D\uC740 \uC0AC\uC9C4\uB4E4" });
};
export const query = graphql `
  query PHOTOS_QUERY {
    mdx(frontmatter: { title: { eq: "pic" } }) {
      id
      slug
      body
      frontmatter {
        title
        description
      }
    }
  }
`;
const StyledName = styled('h1', {
    fontSize: '48px',
});
