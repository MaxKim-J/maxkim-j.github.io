import React from 'react';
import { labelStyle, selectStyle } from './LangSelect.css';
import { useLangStore, LANG_LIST } from '../../store/langStore';
import { type Lang } from '../../types';
import { useTranslation } from 'react-i18next';

const navigateByLang = ({
  pathname,
  search,
  targetLang,
}: {
  pathname: string;
  search: string;
  targetLang: Lang;
}) => {
  if (targetLang === 'ko') {
    const pathnameWithoutLang = pathname.split('/').slice(2).join('/');
    window.location.href = `/${pathnameWithoutLang}${search}`;
  } else {
    window.location.href = `/${targetLang}${pathname}${search}`;
  }
};

export function LangSelect() {
  const currentLang = useLangStore((store) => store.lang);
  const setLang = useLangStore((store) => store.setLang);
  const { t } = useTranslation();

  return (
    <>
      <label className={labelStyle} htmlFor="category">
        lang
      </label>
      <select
        className={selectStyle}
        id="category"
        aria-label={t(`블로그의 언어를 바꿉니다`)}
        name="category"
        value={currentLang}
        onChange={(e) => {
          const targetLang = e.target.value as unknown as any;
          if (currentLang !== targetLang) {
            setLang(targetLang);

            const pathname = typeof window !== undefined ? window.location.pathname : '/';
            const search = typeof window !== undefined ? window.location.search : '';
            navigateByLang({ pathname, search, targetLang });
          }
        }}
      >
        {LANG_LIST.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </>
  );
}
