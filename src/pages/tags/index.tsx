import { graphql } from 'gatsby';
import React from 'react';
import { parse } from 'query-string';

import Footer from '../../components/@layout/Footer';
import Header from '../../components/@layout/Header/Header';

import MainLayout from '../../components/@layout/MainLayout';
import PostListView from '../../components/@pages/tags/PostList';
import globalStyle from '../../styles/global';
import MetaHead from '../../components/@fundamentals/MetaHead';
import { PostList } from '../../types';

export interface Props {
  data: {
    allMdx: {
      nodes: PostList;
    };
  };
}

export default function TagPage({ data }: Props) {
  globalStyle();

  const parsed = typeof window !== 'undefined' ? parse(location.search) : {};

  return (
    <MainLayout header={<Header />} footer={<Footer />}>
      <h1>태그 모아보기 - #{parsed.tag}</h1>
      <PostListView postList={data.allMdx.nodes} />
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
  return <MetaHead title="김맥스 블로그 | 태그모아보기" />;
};
