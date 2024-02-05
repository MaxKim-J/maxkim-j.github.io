import React from 'react';

import { type BlogPosts } from '../../types';
import PostLink from './PostLink';

import { orderedListStyle } from './PostList.css';
import { useCategoryStore } from '../../store/categoryStore';

interface Props {
  postList: BlogPosts;
}

function PostList({ postList }: Props) {
  const category = useCategoryStore((state) => state.category);

  const refinedPostList = postList.filter(({ frontmatter }) => {
    if (category === 'all') {
      return frontmatter.category !== null;
    }
    return frontmatter.category === category;
  });

  return (
    <ol className={orderedListStyle} aria-label="포스트 목록">
      {refinedPostList.length ? (
        refinedPostList.map(({ id, frontmatter, slug }) => (
          <PostLink key={id} id={id} slug={slug} frontmatter={frontmatter} />
        ))
      ) : (
        <div>No post</div>
      )}
    </ol>
  );
}

export default PostList;
