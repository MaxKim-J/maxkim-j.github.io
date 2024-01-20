import { Link } from 'gatsby';
import React from 'react';
import { styled } from '../styles/stitches';

function Header() {
  return (
    <HeaderWrapper>
      <Link to="/">
        <Title>김맥스 블로그</Title>
      </Link>
    </HeaderWrapper>
  );
}

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
