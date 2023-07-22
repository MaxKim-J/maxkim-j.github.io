import { Link } from 'gatsby';
import React from 'react';
import { styled } from '../../../styles/stitches';

import ThemeSelect from './ThemeSelect';

function Header() {
  return (
    <HeaderWrapper>
      <LeftSide>
        <Link to="/">
          <Title>김맥스 블로그</Title>
        </Link>
      </LeftSide>
      <RightSide>
        <div>
          <Link to="/pic">pic</Link>
        </div>
        <div>
          <Link to="/about">about</Link>
        </div>
        <div>
          <Link to="/rss.xml">rss</Link>
        </div>
        <ThemeSelect />
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

export default Header;
