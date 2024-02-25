import React from 'react';
import { labelStyle, selectStyle } from './LangSelect.css';
import { useLangStore, LANG_LIST } from '../../store/langStore';
import { type Lang } from '../../types';

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
  return (
    <>
      <label className={labelStyle} htmlFor="category">
        lang
      </label>
      <select
        className={selectStyle}
        id="category"
        aria-label="카테고리를 선택하면 아래 포스트 목록을 카테고리에 따라 보실 수 있어요"
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
