import { Link } from 'gatsby';
import React from 'react';
import { styled } from '../../../styles/stitches';

import Tooltip from '../../@fundamentals/Tooltip';
import ThemeTooltip from './ThemeTooltip';

function Header() {
  return (
    <HeaderWrapper>
      <LeftSide>
        <Link to="/">
          <Title>김맥스 블로그</Title>
        </Link>
      </LeftSide>
      <RightSide>
        <Tooltip tooltip={<ThemeTooltip />}>
          <div>theme</div>
        </Tooltip>
        <div>
          <Link to="/pic">pic</Link>
        </div>
        <div>
          <Link to="/about">about</Link>
        </div>
        <div>
          <Link to="/rss.xml">rss</Link>
        </div>
      </RightSide>
    </HeaderWrapper>
  );
}

const LeftSide = styled('div', {});

const RightSide = styled('div', {
  display: 'flex',
  alignItems: 'center',
  '& >div': {
    marginLeft: '15px',
  },
  '@mobile': {
    fontSize: '12px'
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
