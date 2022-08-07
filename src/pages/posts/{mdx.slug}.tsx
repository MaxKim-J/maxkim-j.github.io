import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import Footer from '../../components/@layout/Footer';
import Header from '../../components/@layout/Header/Header';

import MainLayout from '../../components/@layout/MainLayout';
import globalStyle from '../../styles/global';

interface Props {
  data: {
    mdx: {
      id: string;
      slug: string;
      body: string;
      frontmatter: {
        date: string;
        title: string;
      };
    };
  };
}

export default function PostPage({ data }: Props) {
  globalStyle();

  const {
    body,
    frontmatter: { title },
  } = data.mdx;

  return (
    <MainLayout
      header={<Header />}
      main={
        <div>
          <h1>{title}</h1>
          <MDXRenderer>{body}</MDXRenderer>
        </div>
      }
      footer={<Footer />}
    />
  );
}

export const query = graphql`
  query POST_BY_SLUG($slug: String) {
    mdx(slug: { eq: $slug }) {
      id
      slug
      body
      frontmatter {
        date
        title
      }
    }
  }
`;
