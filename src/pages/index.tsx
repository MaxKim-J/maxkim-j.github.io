import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostList from '../components/PostList/PostList';
import CustomHead from '../components/Head';
import { type BlogPosts } from '../types';
import MenuBar from '../components/MenuBar/MenuBar';
import { PostCategories } from '../components/PostCategory';
import { useLangStore } from '../store/langStore';
import { initialize } from '../i18n/initialize';

const LANG = 'ko';

export interface Props {
  data: {
    allMdx: {
      nodes: BlogPosts;
    };
  };
}

const IndexPage = ({ data }: Props) => {
  initialize(LANG);
  useLangStore((state) => state.setLang)(LANG);

  return (
    <Layout
      header={<Header />}
      nav={
        <>
          <MenuBar />
          <PostCategories postList={data.allMdx.nodes} />
        </>
      }
      footer={<Footer />}
    >
      <PostList postList={data.allMdx.nodes} />
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { lang: { eq: "ko" }, title: { nin: ["about", "pic"] } } }
    ) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "YYYY년 MM월 DD일")
          description
          tags
          slug
          category
        }
      }
    }
  }
`;

export const Head = () => {
  return <CustomHead lang={LANG} />;
};

export default IndexPage;
