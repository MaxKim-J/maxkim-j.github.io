import React, { useContext } from 'react';
import { Link } from 'gatsby';

import { Props } from '../../../pages/index';
import { styled } from '../../../styles/stitches';
import { categoryContext } from '../../../context/categoryContext';

function PostList({ postList }: Props['data']) {
  const { category } = useContext(categoryContext);

  const refinedPostList = postList.allMdx.nodes.filter(({ frontmatter }) => {
    if (category === 'all') {
      return frontmatter.category !== null;
    }
    return frontmatter.category === category;
  });

  return (
    <ListItemRoot>
      {refinedPostList.length ? (
        refinedPostList.map(({ id, frontmatter, slug }) => (
          <Link to={`/posts/${slug}`} key={id}>
            <ListItem>
              <ListItemTitle>{frontmatter.title}</ListItemTitle>
              <ListItemDescription>
                {frontmatter.date} - {frontmatter.description}
              </ListItemDescription>
            </ListItem>
          </Link>
        ))
      ) : (
        <div>No post</div>
      )}
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
    fontSize: '12px',
  },
});

export default PostList;
