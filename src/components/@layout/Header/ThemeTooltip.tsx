import React, { useContext } from 'react';
import { styled } from '../../../styles/stitches';
import { themeContext } from '../../../context/themeContext';

function ThemeTooltip() {
  const { setBlogTheme } = useContext(themeContext);

  return (
    <>
      <ThemeWrapper>
        {['none', 'dark', 'orange'].map((theme) => {
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
      <ThemeWrapper>
        {['turquoise', 'pink'].map((theme) => {
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
