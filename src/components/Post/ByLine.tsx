import React from 'react';
import { Link } from 'gatsby';

import { BlogPost } from '../../types';
import {
  personalSectionStyle,
  socialMediaSectionStyle,
  socialMediaLinkStyle,
  sharedSectionStyle,
  sharedSectionActionButtonStyle,
  bottomNavSectionStyle,
  bottomNavLinkStyle,
} from './ByLine.css';
interface Props {
  postSlugs: BlogPost['slug'][];
  currentSlug: BlogPost['slug'];
  title: BlogPost['frontmatter']['title'];
}

function ByLine({ postSlugs, currentSlug, title }: Props) {
  const currentSlugIndex = postSlugs.indexOf(currentSlug);

  const prevSlugIndex = currentSlugIndex - 1;
  const postSlugIndex = currentSlugIndex + 1;
  const randomSlugIndex = Math.floor(Math.random() * postSlugs.length);

  return (
    <div>
      <hr />
      <div className={personalSectionStyle}>
        <div>Written by 김맥스</div>
        <div className={socialMediaSectionStyle}>
          <Link className={socialMediaLinkStyle} to="https://twitter.com/max_kim_dev">
            twitter
          </Link>
          <Link className={socialMediaLinkStyle} to="https://github.com/MaxKim-J">
            github
          </Link>
          <Link
            className={socialMediaLinkStyle}
            to="https://www.linkedin.com/in/%EC%A2%85%ED%98%81-%EA%B9%80-903967177/"
          >
            linkedin
          </Link>
        </div>
      </div>
      <div className={sharedSectionStyle}>
        <button
          className={sharedSectionActionButtonStyle}
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
        </button>
        <button
          className={sharedSectionActionButtonStyle}
          onClick={async () => {
            await navigator.clipboard.writeText(window.location.href);
            alert('지금 보고 계시는 포스트의 URL이 클립보드에 복사되었습니다.');
          }}
        >
          링크 복사하기
        </button>
      </div>
      <div className={bottomNavSectionStyle}>
        <Link to="/">글 목록으로 돌아가기</Link>
        <div>
          {prevSlugIndex >= 0 && (
            <Link className={bottomNavLinkStyle} to={`/posts/${postSlugs[prevSlugIndex]}`}>
              이전글
            </Link>
          )}
          {postSlugIndex < postSlugs.length && (
            <Link className={bottomNavLinkStyle} to={`/posts/${postSlugs[postSlugIndex]}`}>
              다음글
            </Link>
          )}
          <Link className={bottomNavLinkStyle} to={`/posts/${postSlugs[randomSlugIndex]}`}>
            랜덤
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ByLine;
