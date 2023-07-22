import React, { useState } from 'react';
import { styled } from '../../../styles/stitches';

import { Theme } from '../../../types';

const STORAGE_KEY_THEME = 'maxkim-blog-theme';

const themes: Theme[] = ['light', 'dark', 'mincho', 'lemon'];

function ThemeSelect({ pos = 'main' }: { pos: 'main' | 'sub' }) {
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
    <StyledSelect
      css={
        pos === 'main'
          ? {}
          : {
              marginLeft: '4px',
              marginRight: 0,
              '@mobile': {
                fontSize: '10px',
                marginRight: '0px',
              },
            }
      }
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
    </StyledSelect>
  );
}

const StyledSelect = styled('select', {
  cursor: 'pointer',
  marginRight: '12px',
  fontSize: '14px',
});

export default ThemeSelect;
