import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import ByLine from './ByLine';
import PostTitle from './PostTitle';
import Comments from './Comments';
import type { BlogPost, PostSlugList } from '../../types';

interface Props {
  post: BlogPost;
  postSlugList: PostSlugList;
}

function Post({ post, postSlugList }: Props) {
  const {
    body,
    slug,
    frontmatter: { title, date, description, tags },
  } = post;

  const postSlugs = postSlugList.nodes.map((node) => node.slug);

  return (
    <article>
      <PostTitle title={title} date={date} description={description} tags={tags as string[]} />
      <section className="mdx-post">
        <MDXRenderer>{body as string}</MDXRenderer>
      </section>
      <ByLine postSlugs={postSlugs} currentSlug={slug} title={title} />
      <Comments />
    </article>
  );
}

export default Post;
