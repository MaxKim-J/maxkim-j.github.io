import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
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
    <>
      <h1>{title}</h1>
      <MDXRenderer>{body}</MDXRenderer>
    </>
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
