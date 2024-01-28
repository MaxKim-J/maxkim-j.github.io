import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostList from '../components/PostList/PostList';
import CustomHead from '../components/Head';
import { type BlogPosts } from '../types';
import MenuBar from '../components/MenuBar/MenuBar';

export interface Props {
  data: {
    allMdx: {
      nodes: BlogPosts;
    };
  };
}

const IndexPage = ({ data }: Props) => {
  return (
    <Layout header={<Header />} nav={<MenuBar showCategory />} footer={<Footer />}>
      <PostList postList={data.allMdx.nodes} />
    </Layout>
  );
};

export const query = graphql`
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
  return <CustomHead />;
};

export default IndexPage;
