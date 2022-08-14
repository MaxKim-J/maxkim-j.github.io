import React, { useContext } from 'react';
import { styled } from '../../../styles/stitches';
import { themeContext } from '../../../context/themeContext';

function ThemeTooltip() {
  const { setBlogTheme } = useContext(themeContext);

  return (
    <ThemeWrapper>
      {['none', 'dark', 'orange', 'turquoise', 'pink'].map((theme) => {
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
  );
}

const ThemeWrapper = styled('div', {
  display: 'flex',
  width: '30%',
  justifyContent: 'space-between',
});

const ThemeText = styled('div', {
  fontSize: '$body4',
  margin: '0 2px',
});

export default ThemeTooltip;
