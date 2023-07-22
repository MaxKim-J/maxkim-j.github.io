import React from 'react';
import { styled } from '../../../styles/stitches';

import { Theme } from '../../../types';

const STORAGE_KEY_THEME = 'maxkim-blog-theme';

const themes: Theme[] = ['light', 'dark', 'mincho', 'lemon'];

function ThemeTooltip() {
  const setBlogTheme = (theme: Theme) => {
    localStorage.setItem(STORAGE_KEY_THEME, theme);

    if (typeof window !== 'undefined') {
      //TODO window 타이핑하기
      (window as any).__setTheme(theme);
    }
  };

  return (
    <>
      <ThemeWrapper>
        {themes.map((theme) => {
          return (
            <ThemeText
              key={theme}
              onClick={() => {
                setBlogTheme(theme);
              }}
            >
              {theme}
            </ThemeText>
          );
        })}
      </ThemeWrapper>
    </>
  );
}

const ThemeWrapper = styled('div', {
  display: 'flex',
});

const ThemeText = styled('div', {
  fontSize: '$body4',
  marginRight: '8px',
  '&:hover': {
    textDecoration: 'underline',
  },
});

export default ThemeTooltip;
