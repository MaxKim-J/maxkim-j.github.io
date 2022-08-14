import React, { createContext, ReactChildren, useState } from 'react';
import { styled } from '../styles/stitches';

type Theme = 'dark' | 'orange' | 'turquoise' | 'pink' | 'none';

export interface ThemeContextState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const themeContext = createContext<ThemeContextState>({
  theme: undefined,
  setBlogTheme: () => {
    return;
  },
});

const STORAGE_KEY_THEME = 'maxkim-blog-theme';

export const ThemeContextProvider = ({
  children,
}: {
  children: ReactChildren;
}) => {
  const currentTheme = localStorage.getItem(STORAGE_KEY_THEME);
  const [theme, setTheme] = useState<Theme>(currentTheme ?? 'none');

  const setBlogTheme = (theme: Theme) => {
    setTheme(theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  };

  return (
    <themeContext.Provider
      value={{
        theme,
        setBlogTheme,
      }}
    >
      <ThemeContainer theme={theme}>{children}</ThemeContainer>
    </themeContext.Provider>
  );
};

const ThemeContainer = styled('div', {
  variants: {
    theme: {
      none: {
        color: '$black',
        ' a': {
          color: '$black',
        },
        ' p': {
          color: '$black',
        },
      },
      dark: {
        backgroundColor: '$dark',
        color: '$white',
        ' a': {
          color: '$white',
        },
        ' p': {
          color: '$white',
        },
      },
      orange: {
        backgroundColor: '$orange',
        color: '$black',
        ' a': {
          color: '$black',
        },
        ' p': {
          color: '$black',
        },
      },
      turquoise: {
        backgroundColor: '$turquoise',
        color: '$black',
        ' a': {
          color: '$black',
        },
        ' p': {
          color: '$black',
        },
      },
      pink: {
        backgroundColor: '$pink',
        color: '$black',
        ' a': {
          color: '$black',
        },
        ' p': {
          color: '$black',
        },
      },
    },
  },
});
