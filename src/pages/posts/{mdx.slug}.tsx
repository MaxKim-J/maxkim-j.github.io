import { graphql } from 'gatsby';
import React from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Post from '../../components/Post';
import MetaHead from '../../components/Head';
import Layout from '../../components/Layout';
import type { BlogPost, PostSlugList } from '../../types';
import MenuBar from '../../components/MenuBar';

interface Props {
  data: {
    post: BlogPost;
    postSlugList: PostSlugList;
  };
}

export default function PostPage({ data: { post, postSlugList } }: Props) {
  return (
    <Layout header={<Header />} nav={<MenuBar />} footer={<Footer />}>
      <Post post={post} postSlugList={postSlugList} />
    </Layout>
  );
}

export const Head = (data: Props) => {
  const { title, description } = data.data.post.frontmatter;

  return <MetaHead title={title} description={description} />;
};

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
