import React from 'react';
import { footerSectionStyle, footerContentStyle, footerAnchorStyle } from './Footer.css';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <div className={footerSectionStyle}>
      <div className={footerContentStyle}>{t('김맥스 블로그ⓒ김종혁, 2024')}</div>
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
