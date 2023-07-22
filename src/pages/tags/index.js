import { graphql } from 'gatsby';
import React from 'react';
import { parse } from 'query-string';
import Footer from '../../components/@layout/Footer';
import Header from '../../components/@layout/Header/Header';
import MainLayout from '../../components/@layout/MainLayout';
import PostListView from '../../components/@pages/tags/PostList';
import globalStyle from '../../styles/global';
import MetaHead from '../../components/@fundamentals/MetaHead';
export default function TagPage({ data }) {
    globalStyle();
    const parsed = typeof window !== 'undefined' ? parse(location.search) : {};
    return (React.createElement(MainLayout, { header: React.createElement(Header, null), footer: React.createElement(Footer, null) },
        React.createElement("h1", null,
            "\uD0DC\uADF8 \uBAA8\uC544\uBCF4\uAE30 - #",
            parsed.tag),
        React.createElement(PostListView, { postList: data.allMdx.nodes })));
}
export const query = graphql `
  query TAG_QUERY {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "YYYY년 MM월 DD일")
          description
          tags
          category
        }
        slug
      }
    }
  }
`;
export const Head = () => {
    return React.createElement(MetaHead, { title: "\uAE40\uB9E5\uC2A4 \uBE14\uB85C\uADF8 | \uD0DC\uADF8\uBAA8\uC544\uBCF4\uAE30" });
};
