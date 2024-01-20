import React from 'react';
import { styled } from '../../styles/stitches';
import { Link } from 'gatsby';
import { BlogPost } from '../../types';

type Props = Pick<BlogPost['frontmatter'], 'title' | 'description' | 'tags' | 'date'>;

function PostTitle({ title, description, tags }: Props) {
  return (
    <PostTitleWrapper>
      <PostTitleHeading aria-label={`포스트 제목`}>{title}</PostTitleHeading>
      <PostTitleDescription aria-label={`포스트 부제목`}>{description}</PostTitleDescription>
      <PostTitleTagWrapper>
        {(tags ?? []).map((tag) => (
          <PostTitleTag aria-label={`태그${tag}`} key={tag} to={`/tags/?tag=${tag}`}>
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

const PostTitleWrapper = styled('article', {
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
