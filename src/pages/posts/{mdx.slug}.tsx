import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

import Footer from '../../components/@layout/Footer';
import Header from '../../components/@layout/Header/Header';

import MainLayout from '../../components/@layout/MainLayout';
import PostTitle from '../../components/@pages/posts/postTitle';
import globalStyle from '../../styles/global';
import postStyles from '../../styles/post';

interface Props {
  data: {
    mdx: {
      id: string;
      slug: string;
      body: string;
      frontmatter: {
        date: string;
        title: string;
        description: string;
        tags: string[];
      };
    };
  };
}

export default function PostPage({ data }: Props) {
  deckDeckGoHighlightElement();
  globalStyle();
  postStyles();

  const {
    body,
    frontmatter: { title, date, description, tags },
  } = data.mdx;

  return (
    <MainLayout header={<Header />} footer={<Footer />}>
      <PostTitle
        title={title}
        date={date}
        description={description}
        tags={tags}
      />
      <div>
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    </MainLayout>
  );
}

export const query = graphql`
  query POST_BY_SLUG($slug: String) {
    mdx(slug: { eq: $slug }) {
      id
      slug
      body
      frontmatter {
        title
        date(formatString: "YYYY년 MM월 DD일")
        description
        tags
      }
    }
  }
`;
