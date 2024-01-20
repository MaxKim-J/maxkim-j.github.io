import React from 'react';
import { Link } from 'gatsby';
import { styled } from '../../styles/stitches';

interface Props {
  id: string;
  slug: string;
  title: string;
  date: string;
  description: string;
}

function PostLink({ id, slug, title, date, description }: Props) {
  return (
    <Link to={`/posts/${slug}`} key={id}>
      <ListItem>
        <ListItemTitle>{title}</ListItemTitle>
        <ListItemDescription>
          {date} - {description}
        </ListItemDescription>
      </ListItem>
    </Link>
  );
}

const ListItemTitle = styled('span', {
  fontSize: '$subTitle',
  fontWeight: '$bold',
  '@mobile': {
    fontSize: '$mobileTitle',
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

const ListItemDescription = styled('span', {
  fontSize: '$description',
  marginTop: '6px',
  '@mobile': {
    fontSize: '$mobileDescription',
  },
});

export default PostLink;
