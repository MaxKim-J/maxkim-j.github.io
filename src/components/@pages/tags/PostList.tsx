import React from 'react';
import { parse } from 'query-string';

import PostLink from '../../@fundamentals/PostList';
import { styled } from '../../../styles/stitches';
import { PostList } from '../../../types';

function PostListView({ postList }: { postList: PostList }) {
  const parsed = typeof window !== 'undefined' ? parse(location.search) : {};
  const tag = parsed.tag as string;

  return (
    <ListItemRoot>
      {postList
        .filter(({ frontmatter }) => (frontmatter.tags ?? []).includes(tag))
        .map(({ id, frontmatter, slug }) => (
          <PostLink
            key={id}
            id={id}
            slug={slug}
            title={frontmatter.title}
            date={frontmatter.date}
            description={frontmatter.description}
          />
        ))}
    </ListItemRoot>
  );
}

const ListItemRoot = styled('ol', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  '@mobile': {
    alignItems: 'flex-start',
  },
});

export default PostListView;
