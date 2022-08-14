import React from 'react';
import { Link } from 'gatsby';

import { Props } from '../../../pages/index';
import { styled } from '../../../styles/stitches';

function PostList({ postList }: Props['data']) {
  return (
    <ol>
      {postList &&
        postList.allMdx.nodes.map(({ id, excerpt, frontmatter, slug }) => (
          <ListItem key={id}>
            <Link to={`/posts/${slug}`}>
              <ListItemTitle>{frontmatter.title}</ListItemTitle>
              <ListItemDescription>
                {frontmatter.date} - {frontmatter.description}
              </ListItemDescription>
            </Link>
          </ListItem>
        ))}
    </ol>
  );
}

const ListItem = styled('li', {
  marginBottom: '48px',
});

const ListItemTitle = styled('div', {
  fontSize: '$title',
  fontWeight: '$bold',
  textAlign: 'right',
  '@mobile': {
    fontSize: '$mobileTitle',
  },
});

const ListItemDescription = styled('div', {
  fontSize: '$description',
  textAlign: 'right',
  marginTop: '6px',
  '@mobile': {
    fontSize: '$mobileDescription',
  },
});

export default PostList;
