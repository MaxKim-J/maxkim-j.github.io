import React from 'react';
import { graphql } from 'gatsby';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import MetaHead from '../../components/Head';
import MenuBar from '../../components/MenuBar/MenuBar';
import { About } from '../../components/About';

export default function AboutPage({ data }: { data: { mdx: { body: string } } }) {
  const { body } = data.mdx;

  return (
    <Layout header={<Header />} footer={<Footer />} nav={<MenuBar />}>
      <About body={body} />
    </Layout>
  );
}

export const query = graphql`
  query ABOUT_QUERY {
    mdx(frontmatter: { title: { eq: "about" } }) {
      id
      slug
      body
      frontmatter {
        title
        description
      }
    }
  }
`;

export const Head = () => {
  return <MetaHead title="김맥스 블로그 | about" description="안녕하세요 김종혁입니다." />;
};
