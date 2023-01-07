import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

import { css } from '../../styles/stitches';

import Footer from '../../components/@layout/Footer';
import Header from '../../components/@layout/Header/Header';

import MainLayout from '../../components/@layout/MainLayout';
import PostTitle from '../../components/@pages/posts/postTitle';
import globalStyle from '../../styles/global';
import postStyles from '../../styles/post';
import ByLine from '../../components/@pages/posts/ByLine';
import MetaHead from '../../components/@fundamentals/MetaHead';

interface Props {
  data: {
    post: {
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
    postSlugList: {
      nodes: { slug: string }[];
    };
  };
}

export default function PostPage({ data: { post, postSlugList } }: Props) {
  deckDeckGoHighlightElement();
  globalStyle();
  postStyles();

  const {
    body,
    slug,
    frontmatter: { title, date, description, tags },
  } = post;

  const { nodes } = postSlugList;
  const postSlugs = nodes.map((node) => node.slug);

  return (
    <MainLayout header={<Header />} footer={<Footer />}>
      <PostTitle title={title} date={date} description={description} tags={tags} />
      <div className={postStyle()}>
        <MDXRenderer>{body}</MDXRenderer>
      </div>
      <ByLine postSlugs={postSlugs} currentSlug={slug} title={title} />
    </MainLayout>
  );
}

const postStyle = css({
  ol: {
    listStyleType: 'decimal',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '2em',
  },
});

export const query = graphql`
  query ($slug: String) {
    post: mdx(slug: { eq: $slug }) {
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
    postSlugList: allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        slug
      }
    }
  }
`;

export const Head = (data) => {
  const { title, description } = data.data.post.frontmatter;

  return <MetaHead title={title} description={description} />;
};
