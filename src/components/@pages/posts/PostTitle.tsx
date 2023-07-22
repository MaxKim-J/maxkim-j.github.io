import React from 'react';
import { styled } from '../../../styles/stitches';
import { Link } from 'gatsby';
import { Post } from '../../../types';

type Props = Pick<Post['frontmatter'], 'title' | 'description' | 'tags' | 'date'>;

function PostTitle({ title, description, tags }: Props) {
  return (
    <PostTitleWrapper>
      <PostTitleHeading>{title}</PostTitleHeading>
      <PostTitleDescription>{description}</PostTitleDescription>
      <PostTitleTagWrapper>
        {(tags ?? []).map((tag) => (
          <PostTitleTag key={tag} to={`/tags/?tag=${tag}`}>
            #{tag}
          </PostTitleTag>
        ))}
      </PostTitleTagWrapper>
    </PostTitleWrapper>
  );
}

const PostTitleHeading = styled('h1', {
  margin: '28px 0',
});

const PostTitleWrapper = styled('div', {
  marginBottom: '60px',
});

const PostTitleDescription = styled('div', {
  fontSize: '$body2',
  marginBottom: '6px',
});

const PostTitleTagWrapper = styled('div', {
  fontSize: '$description',
});

const PostTitleTag = styled(Link, {
  fontSize: '$description',
  marginRight: '12px',
  textDecoration: 'underline',
});

export default PostTitle;
