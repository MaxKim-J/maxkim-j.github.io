import { graphql } from 'gatsby';
import React from 'react';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Post from '../../../components/Post/Post';
import MetaHead from '../../../components/Head';
import Layout from '../../../components/Layout';
import MenuBar from '../../../components/MenuBar/MenuBar';
import type { BlogPost, PostSlugList } from '../../../types';
import { useLangStore } from '../../../store/langStore';
import { initialize } from '../../../i18n/initialize';

const LANG = 'en';

deckDeckGoHighlightElement();

interface Props {
  data: {
    post: BlogPost;
    postSlugList: PostSlugList;
  };
}

export default function PostPage({ data: { post, postSlugList } }: Props) {
  initialize(LANG);
  useLangStore((state) => state.setLang)(LANG);

  return (
    <Layout header={<Header />} nav={<MenuBar />} footer={<Footer />}>
      <Post post={post} postSlugList={postSlugList} />
    </Layout>
  );
}

export const Head = (data: Props) => {
  const { title, description, slug } = data.data.post.frontmatter;
  const thumbnail = data.data.post.frontmatter?.thumbnail?.childImageSharp.fluid.src ?? undefined;

  return (
    <MetaHead
      lang={LANG}
      type="article"
      title={title}
      slug={slug}
      description={description}
      thumbnail={thumbnail}
    />
  );
};

export const query = graphql`
  query ($frontmatter__slug: String) {
    post: mdx(frontmatter: { slug: { eq: $frontmatter__slug }, lang: { eq: "en" } }) {
      id
      slug
      body
      frontmatter {
        title
        date(formatString: "DD. MM. YYYY")
        description
        tags
      }
    }
    postSlugList: allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        frontmatter {
          slug
        }
      }
    }
  }
`;
