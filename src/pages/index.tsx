import * as React from 'react';
import { graphql, Link } from 'gatsby';

import MainLayout from '../components/@layout/MainLayout';
import MainHeader from '../components/@layout/Header/MainHeader';
import Footer from '../components/@layout/Footer';
import PostList from '../components/@pages/home/PostList';
export interface Props {
  data: {
    allMdx: {
      nodes: {
        id: string;
        slug: string;
        excerpt: string;
        frontmatter: {
          title: string;
          data: string;
        };
      }[];
    };
  };
}

const IndexPage = ({ data }: Props) => {
  return (
    <MainLayout header={<MainHeader />} footer={<Footer />}>
      {/* 개수 받기 */}
      <PostList postList={data} />
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
          date(formatString: "YYYY월 MM월 DD일")
          description
          tags
        }
        slug
      }
    }
  }
`;
