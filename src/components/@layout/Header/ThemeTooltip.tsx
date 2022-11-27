import React from 'react';
import { styled } from '../../../styles/stitches';
const STORAGE_KEY_THEME = 'maxkim-blog-theme';

function ThemeTooltip() {
  const setBlogTheme = (theme: Theme) => {
    localStorage.setItem(STORAGE_KEY_THEME, theme);
    typeof window !== 'undefined' && window.location.reload();
  };
  return (
    <>
      <ThemeWrapper>
        {['light', 'dark', 'mincho', 'lemon'].map((theme) => {
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
  // flexDirection: 'column',
});

const ThemeText = styled('div', {
  fontSize: '$body4',
  marginRight: '8px',
  '&:hover': {
    textDecoration: 'underline',
  },
});

export default ThemeTooltip;
