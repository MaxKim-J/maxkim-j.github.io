import React from 'react';
import { Link } from 'gatsby';
import { useLangStore } from '../../store/langStore';
import { useTranslation } from 'react-i18next';

import { menuLinkStyle } from './Menu.css';

function MenuBar() {
  const currentLang = useLangStore((store) => store.lang);
  const { t } = useTranslation();
  return (
    <>
      <Link
        className={menuLinkStyle}
        to={currentLang === 'ko' ? '/about' : `/${currentLang}/about`}
        aria-label={t('제가 누구인지 보실 수 있는 페이지로 이동해요')}
      >
        about
      </Link>
      <Link
        className={menuLinkStyle}
        to={currentLang === 'ko' ? '/pic' : `/${currentLang}/pic`}
        aria-label={t('제가 찍은 사진들이 있는 페이지로 이동해요')}
      >
        pic
      </Link>
      <Link className={menuLinkStyle} to="/rss.xml" aria-label={t('rss 페이지로 이동해요')}>
        rss
      </Link>
    </>
  );
}

export default MenuBar;
