import { graphql } from 'gatsby';
import React from 'react';
import LegacyPostRedirect, {
  LegacyPostRedirectHead,
  postUrl,
} from '../../../components/LegacyPostRedirect';

const LANG = 'en';

interface Props {
  data: {
    post: {
      frontmatter: {
        title: string;
        description: string;
        slug: string;
      };
    };
  };
}

export default function PostPage({ data: { post } }: Props) {
  return <LegacyPostRedirect target={postUrl(LANG, post.frontmatter.slug)} />;
}

export const Head = (data: Props) => {
  const { title, description, slug } = data.data.post.frontmatter;
  return (
    <LegacyPostRedirectHead target={postUrl(LANG, slug)} title={title} description={description} />
  );
};

export const query = graphql`
  query ($frontmatter__slug: String) {
    post: mdx(frontmatter: { slug: { eq: $frontmatter__slug }, lang: { eq: "en" } }) {
      frontmatter {
        title
        description
        slug
      }
    }
  }
`;
