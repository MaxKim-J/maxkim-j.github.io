import * as React from 'react';
import { graphql } from 'gatsby';
import globalStyle from '../styles/global';
import MainLayout from '../components/@layout/MainLayout';
import MainHeader from '../components/@layout/Header/MainHeader';
import Footer from '../components/@layout/Footer';
import PostListView from '../components/@pages/home/PostList';
import MetaHead from '../components/@fundamentals/MetaHead';
const IndexPage = ({ data }) => {
    globalStyle();
    return (React.createElement(MainLayout, { header: React.createElement(MainHeader, null), footer: React.createElement(Footer, null) },
        React.createElement(PostListView, { postList: data.allMdx.nodes })));
};
export default IndexPage;
export const query = graphql `
  query SITE_INDEX_QUERY {
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
    return React.createElement(MetaHead, null);
};
