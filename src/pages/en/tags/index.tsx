import { graphql } from 'gatsby';
import React from 'react';
import { parse } from 'query-string';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Layout from '../../../components/Layout';
import PostList from '../../../components/PostList/PostList';
import CustomHead from '../../../components/Head';
import { BlogPosts } from '../../../types';
import MenuBar from '../../../components/MenuBar/MenuBar';
import { TagTitle } from '../../../components/TagTitle';

import { useLangStore } from '../../../store/langStore';
import { initialize } from '../../../i18n/initialize';

const LANG = 'en';

export interface Props {
  data: {
    allMdx: {
      nodes: BlogPosts;
    };
  };
}

export default function TagPage({ data }: Props) {
  initialize(LANG);
  useLangStore((state) => state.setLang)(LANG);

  const parsed = typeof window !== 'undefined' ? parse(location.search) : ({} as string);
  const tag = (parsed as any).tag;

  const posts = data.allMdx.nodes.filter((node) =>
    (node.frontmatter?.tags ?? []).includes(tag ?? '')
  );

  return (
    <Layout header={<Header />} nav={<MenuBar />} footer={<Footer />}>
      <TagTitle tag={tag} count={posts.length} />
      <PostList postList={posts} />
    </Layout>
  );
}

export const query = graphql`
  query TAG_QUERY_EN {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "YYYY년 MM월 DD일")
          description
          tags
          category
          slug
        }
      }
    }
  }
`;

export const Head = () => {
  return <CustomHead lang={LANG} title="김맥스 블로그 | 태그모아보기" />;
};
