import React from 'react';
import { Link } from 'gatsby';

import { styled } from '../../../styles/stitches';
import Utterances from './Utterance';
import { Post } from '../../../types';

interface Props {
  postSlugs: Post['slug'][];
  currentSlug: Post['slug'];
  title: Post['frontmatter']['title'];
}

function ByLine({ postSlugs, currentSlug, title }: Props) {
  const currentSlugIndex = postSlugs.indexOf(currentSlug);

  const prevSlugIndex = currentSlugIndex - 1;
  const postSlugIndex = currentSlugIndex + 1;
  const randomSlugIndex = Math.floor(Math.random() * postSlugs.length);

  return (
    <div>
      <StyledLine />
      <PersonalSection>
        <div>Written by 김맥스</div>
        <SocialMediaSection>
          <Link to="https://twitter.com/max_kim_dev">twitter</Link>
          <Link to="https://github.com/MaxKim-J">github</Link>
          <Link to="https://www.linkedin.com/in/%EC%A2%85%ED%98%81-%EA%B9%80-903967177/">
            linkedin
          </Link>
        </SocialMediaSection>
      </PersonalSection>
      <SharedSection>
        <div
          onClick={() => {
            if (window) {
              window.open(
                `https://twitter.com/intent/tweet?text=${title}&url=https://maxkim-j.github.io/posts/${currentSlug}`,
                '_blank'
              );
            }
          }}
        >
          트위터에 공유하기
        </div>
        <div
          onClick={async () => {
            await navigator.clipboard.writeText(window.location.href);
            alert('지금 보고 계시는 포스트의 URL이 클립보드에 복사되었습니다.');
          }}
        >
          링크 복사하기
        </div>
      </SharedSection>
      <NavSection>
        <Link to="/">글 목록으로 돌아가기</Link>
        <NavLinkSection>
          {prevSlugIndex >= 0 && <Link to={`/posts/${postSlugs[prevSlugIndex]}`}>이전글</Link>}
          {postSlugIndex < postSlugs.length && (
            <Link to={`/posts/${postSlugs[postSlugIndex]}`}>다음글</Link>
          )}
          <Link to={`/posts/${postSlugs[randomSlugIndex]}`}>랜덤</Link>
        </NavLinkSection>
      </NavSection>
      <Utterances />
    </div>
  );
}

const StyledLine = styled('div', {
  width: '100%',
  backgroundColor: '$black',
  height: '1px',
  margin: '50px 0',
});

const PersonalSection = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '$description',
});

const SocialMediaSection = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  '& a': {
    marginLeft: '20px',
    hoverUnderline: 'true',
  },
});

const SharedSection = styled('div', {
  marginTop: '20px',
  display: 'flex',
  fontSize: '$description',
  '& div': {
    marginRight: '18px',
    hoverUnderline: 'true',
    cursor: 'pointer',
  },
});

const NavSection = styled('div', {
  margin: '20px 0 60px 0',
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '$description',
  '& a': {
    hoverUnderline: 'true',
  },
});

const NavLinkSection = styled('div', {
  '& a': {
    marginLeft: '20px',
  },
});

export default ByLine;
