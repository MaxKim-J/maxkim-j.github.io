import * as React from 'react';
import { graphql } from 'gatsby';
import globalStyle from '../styles/global';

import MainLayout from '../components/@layout/MainLayout';
import MainHeader from '../components/@layout/Header/MainHeader';
import Footer from '../components/@layout/Footer';
import PostListView from '../components/@pages/home/PostList';
import MetaHead from '../components/@fundamentals/MetaHead';
import { type PostList } from '../types';

export interface Props {
  data: {
    allMdx: {
      nodes: PostList;
    };
  };
}

const IndexPage = ({ data }: Props) => {
  globalStyle();

  return (
    <MainLayout header={<MainHeader />} footer={<Footer />}>
      <PostListView postList={data.allMdx.nodes} />
    </MainLayout>
  );
};

export default IndexPage;

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
  return <MetaHead />;
};
