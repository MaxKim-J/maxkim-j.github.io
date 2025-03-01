import React from 'react';
import { footerSectionStyle, footerContentStyle } from './Footer.css';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <div className={footerSectionStyle}>
      <div className={footerContentStyle}>
        {t('Copyright © 2025 Jonghyuk Max Kim. All Right Reserved')}
      </div>
    </div>
  );
}

export default Footer;
