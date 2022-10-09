import React from 'react';
import { styled } from '../../styles/stitches';

function Footer() {
  return (
    <FooterContent>
      <div>김맥스 블로그ⓒ김종혁, 2022</div>
      <div>
        Powered By <a href="https://www.gatsbyjs.com/">gatsby</a> /<a href="">gh-pages</a>
      </div>
    </FooterContent>
  );
}

const FooterContent = styled('div', {
  marginTop: '32px',
  display: 'flex',
  height: '32px',
  alignItems: 'center',
  justifyContent: 'space-between',
  bottom: 0,
  zIndex: 10,
  '& div': {
    fontSize: '10px',
  },
  '& a': {
    textDecoration: 'underline',
    fontSize: '10px',
  },
  '@mobile': {
    fontSize: '$mobileDescription',
  },
});

export default Footer;
