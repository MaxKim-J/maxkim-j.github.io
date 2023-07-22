import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { styled } from '../../styles/stitches';
import galleryStyle from '../../styles/gallery';

import Footer from '../../components/@layout/Footer';
import Header from '../../components/@layout/Header/Header';
import MainLayout from '../../components/@layout/MainLayout';
import MetaHead from '../../components/@fundamentals/MetaHead';
import { PicPost } from '../../types';

interface Props {
  data: {
    mdx: PicPost;
  };
}

export default function GalleryPage({ data }: Props) {
  galleryStyle();
  const { body } = data.mdx;
  const { title } = data.mdx.frontmatter;

  return (
    <MainLayout header={<Header />} footer={<Footer />}>
      <StyledName>{title}</StyledName>
      <MDXRenderer>{body}</MDXRenderer>
    </MainLayout>
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

const StyledName = styled('h1', {
  fontSize: '48px',
});
