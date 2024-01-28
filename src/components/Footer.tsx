import React from 'react';
import { footerSectionStyle, footerContentStyle, footerAnchorStyle } from './Footer.css';

function Footer() {
  return (
    <div className={footerSectionStyle}>
      <div className={footerContentStyle}>김맥스 블로그ⓒ김종혁, 2020~2024</div>
      <div className={footerContentStyle}>
        Powered By{' '}
        <a className={footerAnchorStyle} href="https://www.gatsbyjs.com/">
          gatsby
        </a>
        /
        <a className={footerAnchorStyle} href="https://pages.github.com/">
          gh-pages
        </a>
      </div>
    </div>
  );
}

export default Footer;
