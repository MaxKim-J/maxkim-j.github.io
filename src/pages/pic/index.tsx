import React, { useLayoutEffect } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { styled } from '../../styles/stitches';
import galleryStyle from '../../styles/gallery';

import Footer from '../../components/@layout/Footer';
import Header from '../../components/@layout/Header/Header';
import MainLayout from '../../components/@layout/MainLayout';
import MetaHead from '../../components/@fundamentals/MetaHead';

interface Props {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        description: string;
      };
    };
  };
}

export default function GalleryPage({ data }: Props) {
  galleryStyle();
  const { body } = data.mdx;
  const { title, description } = data.mdx.frontmatter;

  useLayoutEffect(() => {
    const contextMenuEventListener = document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
    const copyEventListener = document.addEventListener('copy', function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
    const cutEventListener = document.addEventListener('cut', function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
    const listeners = [];
    const imgs = document.querySelectorAll('a.gatsby-resp-image-link');
    imgs.forEach((img) => {
      const callback = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };
      img.addEventListener('click', callback);
      listeners.push(callback);
    });
    return () => {
      document.removeEventListener('contextmenu', contextMenuEventListener);
      document.removeEventListener('copy', copyEventListener);
      document.removeEventListener('cut', cutEventListener);
      imgs.forEach((img, index) => {
        img.removeEventListener('click', listeners[index]);
      });
    };
  }, []);

  return (
    <MainLayout header={<Header />} footer={<Footer />}>
      <StyledName>{title}</StyledName>
      <MDXRenderer>{body}</MDXRenderer>
    </MainLayout>
  );
}

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

export const Head = () => {
  return <MetaHead title="김맥스 블로그 | gallery" description="찍은 사진들" />;
};
