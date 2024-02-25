import { Link } from 'gatsby';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { mainTitleStyle } from './Header.css';
import { useLangStore } from '../store/langStore';

function Header() {
  const { t } = useTranslation();
  const currentLang = useLangStore((state) => state.lang);

  return (
    <Link to={currentLang === 'ko' ? '/' : `/${currentLang}`}>
      <div className={mainTitleStyle}>{t('김맥스 블로그')}</div>
    </Link>
  );
}

export default Header;
