import React from 'react';
import { parse } from 'query-string';

import PostLink from '../../@fundamentals/PostList';
import { Props } from '../../../pages/index';
import { styled } from '../../../styles/stitches';

function PostList({ postList }: Props['data']) {
  const parsed = typeof window !== 'undefined' ? parse(location.search) : {};

  return (
    <ListItemRoot>
      {postList &&
        postList.allMdx.nodes
          .filter(({ frontmatter }) => (frontmatter.tags ?? []).includes(parsed.tag))
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

export default PostList;
