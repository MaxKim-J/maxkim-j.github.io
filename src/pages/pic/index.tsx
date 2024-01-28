import React from 'react';
import { graphql } from 'gatsby';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import MetaHead from '../../components/Head';
import MenuBar from '../../components/MenuBar/MenuBar';

import { Pic } from '../../components/Pic';

import type { PicPost } from '../../types';

interface Props {
  data: {
    mdx: PicPost;
  };
}

export default function GalleryPage({ data }: Props) {
  const { body } = data.mdx;

  return (
    <Layout header={<Header />} nav={<MenuBar />} footer={<Footer />}>
      <Pic body={body} />
    </Layout>
  );
}

export const Head = () => {
  return <MetaHead title="김맥스 블로그 | gallery" description="찍은 사진들" />;
};

export const query = graphql`
  query PHOTOS_QUERY {
    mdx(frontmatter: { title: { eq: "pic" } }) {
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
