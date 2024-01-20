import { Link } from 'gatsby';
import React from 'react';
import { styled } from '../../styles/stitches';

import ThemeSelect from './ThemeSelect';

function MenuBar() {
  return (
    <HeaderWrapper>
      <LeftSide>
        <Link to="/">
          <Title>김맥스 블로그</Title>
        </Link>
      </LeftSide>
      <RightSide>
        <div>
          <Link to="/pic" aria-label="제가 찍은 사진들이 있는 페이지로 이동해요">
            pic
          </Link>
        </div>
        <div>
          <Link to="/about" aria-label="제가 누구인지 보실 수 있는 페이지로 이동해요">
            about
          </Link>
        </div>
        <div>
          <Link to="/rss.xml" aria-label="rss 페이지로 이동해요">
            rss
          </Link>
        </div>
        <ThemeSelect pos="sub" />
      </RightSide>
    </HeaderWrapper>
  );
}

const LeftSide = styled('div', {});

const RightSide = styled('div', {
  display: 'flex',
  alignItems: 'center',
  '& >div': {
    margin: '0 7px',
  },
  '@mobile': {
    fontSize: '12px',
  },
});

const HeaderWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '82px',
});

const Title = styled('div', {
  fontSize: '$mainTitle',
  fontWeight: '$bold',
  '@mobile': {
    fontSize: '$subTitle',
  },
});

export default MenuBar;
