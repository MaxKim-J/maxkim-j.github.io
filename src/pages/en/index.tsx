import { graphql } from 'gatsby';
import * as React from 'react';

import Footer from '../../components/Footer';
import CustomHead from '../../components/Head';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import MenuBar from '../../components/MenuBar/MenuBar';
import PostList from '../../components/PostList/PostList';
import { type BlogPosts } from '../../types';

import { initialize } from '../../i18n/initialize';
import { useLangStore } from '../../store/langStore';

const LANG = 'en';

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
    <Layout header={<Header />} nav={<MenuBar />} footer={<Footer />}>
      <PostList postList={data.allMdx.nodes} />
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { lang: { eq: "en" }, title: { nin: ["about", "pic"] } } }
    ) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "DD.MM.YYYY")
          description
          tags
          lang
          category
          slug
        }
      }
    }
  }
`;

export const Head = () => {
  return <CustomHead lang={LANG} />;
};

export default IndexPage;
