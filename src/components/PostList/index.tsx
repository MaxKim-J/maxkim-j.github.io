import React, { useContext } from 'react';
import { Link } from 'gatsby';

import { styled } from '../../styles/stitches';
import { categoryContext } from '../../context/categoryContext';
import { type BlogPosts } from '../../types';

interface Props {
  postList: BlogPosts;
}

function PostList({ postList }: Props) {
  const { category } = useContext(categoryContext);

  const refinedPostList = postList.filter(({ frontmatter }) => {
    if (category === 'all') {
      return frontmatter.category !== null;
    }
    return frontmatter.category === category;
  });

  return (
    <ListItemRoot aria-label="포스트 목록">
      {refinedPostList.length ? (
        refinedPostList.map(({ id, frontmatter, slug }) => (
          <Link to={`/posts/${slug}`} key={id}>
            <section>
              <ListItem>
                <ListItemTitle>{frontmatter.title}</ListItemTitle>
                <ListItemDescription>
                  {frontmatter.date} - {frontmatter.description}
                </ListItemDescription>
              </ListItem>
            </section>
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
  margin: '24px 0',
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
