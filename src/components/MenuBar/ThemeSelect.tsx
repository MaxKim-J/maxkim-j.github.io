import React from 'react';
import { labelStyle, selectStyle } from './ThemeSelect.css';
import { THEME_LIST, useThemeStore } from '../../store/themeStore';
import { useTranslation } from 'react-i18next';

function ThemeSelect() {
  const { theme, setTheme } = useThemeStore((state) => state);
  const { t } = useTranslation();

  return (
    <>
      <label htmlFor="theme" className={labelStyle}>
        theme
      </label>
      <select
        className={selectStyle}
        id="theme"
        aria-label={t('블로그의 색깔 테마를 바꿀 수 있어요')}
        name="theme"
        value={theme}
        onChange={(e) => {
          const value = e.target.value as unknown as any;
          setTheme(value);
        }}
      >
        {THEME_LIST.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </>
  );
}

export default ThemeSelect;
