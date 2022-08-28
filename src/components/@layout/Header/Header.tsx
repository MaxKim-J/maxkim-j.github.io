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
          <div>color</div>
        </Tooltip>
        <div>
          <Link to="/photo">photo</Link>
        </div>
        <div>
          <Link to="/about">about</Link>
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
    marginLeft: '25px',
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
