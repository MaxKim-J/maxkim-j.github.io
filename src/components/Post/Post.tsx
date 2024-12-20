import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import ByLine from './ByLine';
import PostTitle from './PostTitle';
import Comments from './Comments';
import type { BlogPost, PostSlugList } from '../../types';
import { postSectionStyle } from './Post.css';

interface Props {
  post: BlogPost;
  postSlugList: PostSlugList;
}

function Post({ post, postSlugList }: Props) {
  const {
    body,
    frontmatter: { title, date, description, tags, slug },
  } = post;

  const postSlugs = Array.from(
    new Set(postSlugList.nodes.map((node) => node.frontmatter.slug).filter(Boolean))
  );

  return (
    <article>
      <PostTitle title={title} date={date} description={description} tags={tags as string[]} />
      <section className={`mdx-post ${postSectionStyle}`}>
        <MDXRenderer>{body as string}</MDXRenderer>
      </section>
      <ByLine postSlugs={postSlugs} currentSlug={slug} title={title} />
      <Comments />
    </article>
  );
}

export default Post;
