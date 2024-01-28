import React, { useState } from 'react';
import { labelStyle, selectStyle } from './ThemeSelect.css';

import { Theme } from '../../types';

const STORAGE_KEY_THEME = 'maxkim-blog-theme';

const themes: Theme[] = ['light', 'dark'];

function ThemeSelect() {
  const [themeValue, setThemeValue] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(STORAGE_KEY_THEME);
    }
    return 'light';
  });

  const setBlogTheme = (theme: Theme) => {
    setThemeValue(theme);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY_THEME, theme);
      //TODO window 타이핑하기
      (window as any).__setTheme(theme);
    }
  };

  return (
    <>
      <label htmlFor="theme" className={labelStyle}>
        theme
      </label>
      <select
        className={selectStyle}
        id="theme"
        aria-label="블로그의 색깔 테마를 바꿀 수 있어요"
        name="theme"
        value={themeValue ?? 'light'}
        onChange={(e) => {
          const value = e.target.value as unknown as any;
          setBlogTheme(value);
        }}
      >
        {themes.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </>
  );
}

export default ThemeSelect;
