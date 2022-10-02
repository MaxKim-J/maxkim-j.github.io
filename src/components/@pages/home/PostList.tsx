import React from 'react';
import { Link } from 'gatsby';

import { Props } from '../../../pages/index';
import { styled } from '../../../styles/stitches';

function PostList({ postList }: Props['data']) {
  return (
    <ListItemRoot>
      {postList &&
        postList.allMdx.nodes.map(({ id, excerpt, frontmatter, slug }) => (
          <Link to={`/posts/${slug}`} key={id}>
            <ListItem>
              <ListItemTitle>{frontmatter.title}</ListItemTitle>
              <ListItemDescription>
                {frontmatter.date} - {frontmatter.description}
              </ListItemDescription>
            </ListItem>
          </Link>
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

const ListItem = styled('li', {
  marginBottom: '48px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  lineHeight: 1.2,
  '@mobile': {
    alignItems: 'flex-start',
  },
});

const ListItemTitle = styled('span', {
  fontSize: '$subTitle',
  fontWeight: '$bold',
  '@mobile': {
    fontSize: '$mobileTitle',
  },
});

const ListItemDescription = styled('span', {
  fontSize: '$description',
  marginTop: '6px',
  '@mobile': {
    fontSize: '$mobileDescription',
  },
});

export default PostList;
