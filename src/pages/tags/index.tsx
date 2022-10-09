import { graphql } from 'gatsby';
import React from 'react';
import { parse } from 'query-string';

import Footer from '../../components/@layout/Footer';
import Header from '../../components/@layout/Header/Header';

import MainLayout from '../../components/@layout/MainLayout';
import PostList from '../../components/@pages/tags/PostList';
import globalStyle from '../../styles/global';

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

export default function TagPage({ data }: Props) {
  globalStyle();

  const parsed = parse(location.search);

  return (
    <MainLayout header={<Header />} footer={<Footer />}>
      <h1>태그 모아보기 - #{parsed.tag}</h1>
      <PostList postList={data} />
    </MainLayout>
  );
}

export const query = graphql`
  query TAG_QUERY {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "YYYY월 MM월 DD일")
          description
          tags
          category
        }
        slug
      }
    }
  }
`;
