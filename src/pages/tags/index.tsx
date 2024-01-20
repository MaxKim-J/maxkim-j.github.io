import { graphql } from 'gatsby';
import React from 'react';
import { parse } from 'query-string';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import PostList from '../../components/PostList';
import CustomHead from '../../components/Head';
import { BlogPosts } from '../../types';
import MenuBar from '../../components/MenuBar';

export interface Props {
  data: {
    allMdx: {
      nodes: BlogPosts;
    };
  };
}

export default function TagPage({ data }: Props) {
  const parsed = typeof window !== 'undefined' ? parse(location.search) : {};

  return (
    <Layout header={<Header />} nav={<MenuBar />} footer={<Footer />}>
      <h1>태그 모아보기 - #{parsed.tag}</h1>
      <PostList postList={data.allMdx.nodes} />
    </Layout>
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
  return <CustomHead title="김맥스 블로그 | 태그모아보기" />;
};
