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

export const ThemeContextProvider = ({ children }: { children: ReactChildren }) => {
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
        'p > code': {
          backgroundColor: '#efefef',
        },
        'deckgo-highlight-code': {
          '--deckgo-highlight-code-carbon-background': '#f5f5f5',
          '--deckgo-highlight-code-carbon-color': '#202020',
          '--deckgo-highlight-code-token-atrule': '#a626a4',
          '--deckgo-highlight-code-token-comment': '#65737e',
          '--deckgo-highlight-code-token-comment-rgb': '101, 115, 126',
          '--deckgo-highlight-code-token-function': '#ac4142',
          '--deckgo-highlight-code-token-operator': '#202020',
          '--deckgo-highlight-code-token-property': '#ac4142',
          '--deckgo-highlight-code-token-punctuation': '#202020',
          '--deckgo-highlight-code-token-regex': '#f4bf75',
          '--deckgo-highlight-code-token-selector': '#90a959',
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
        'p > code': {
          backgroundColor: '#6b6b6b',
        },
        'input[type=range]': {
          backgroundColor: '$white',
        },
        'input[type=range]::-webkit-slider-thumb': {
          backgroundColor: '$white',
        },
        'deckgo-highlight-code': {
          '--deckgo-highlight-code-carbon-background': '#2b2b2b',
          '--deckgo-highlight-code-carbon-color': '#f8f8f2',
          '--deckgo-highlight-code-token-atrule': '#ffa07a',
          '--deckgo-highlight-code-token-comment': '#606060',
          '--deckgo-highlight-code-token-comment-rgb': '212, 208, 171',
          '--deckgo-highlight-code-token-function': '#00e0e0',
          '--deckgo-highlight-code-token-operator': '#abe338',
          '--deckgo-highlight-code-token-function': '#00e0e0',
          '--deckgo-highlight-code-token-punctuation': '#ffd700',
          '--deckgo-highlight-code-token-regex': '#f8f8f2',
          '--deckgo-highlight-code-token-selector': '#f8f8f2',
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
        'p > code': {
          backgroundColor: '#ffc68e',
        },
        'deckgo-highlight-code': {
          '--deckgo-highlight-code-carbon-background': '#2b2b2b',
          '--deckgo-highlight-code-carbon-color': '#f8f8f2',
          '--deckgo-highlight-code-token-atrule': '#ffa07a',
          '--deckgo-highlight-code-token-comment': '#606060',
          '--deckgo-highlight-code-token-comment-rgb': '212, 208, 171',
          '--deckgo-highlight-code-token-function': '#00e0e0',
          '--deckgo-highlight-code-token-operator': '#abe338',
          '--deckgo-highlight-code-token-function': '#00e0e0',
          '--deckgo-highlight-code-token-punctuation': '#ffd700',
          '--deckgo-highlight-code-token-regex': '#f8f8f2',
          '--deckgo-highlight-code-token-selector': '#f8f8f2',
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
        'p > code': {
          backgroundColor: '#a8ffef',
        },
        'deckgo-highlight-code': {
          '--deckgo-highlight-code-carbon-background': '#2b2b2b',
          '--deckgo-highlight-code-carbon-color': '#f8f8f2',
          '--deckgo-highlight-code-token-atrule': '#ffa07a',
          '--deckgo-highlight-code-token-comment': '#606060',
          '--deckgo-highlight-code-token-comment-rgb': '212, 208, 171',
          '--deckgo-highlight-code-token-function': '#00e0e0',
          '--deckgo-highlight-code-token-operator': '#abe338',
          '--deckgo-highlight-code-token-function': '#00e0e0',
          '--deckgo-highlight-code-token-punctuation': '#ffd700',
          '--deckgo-highlight-code-token-regex': '#f8f8f2',
          '--deckgo-highlight-code-token-selector': '#f8f8f2',
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
        'p > code': {
          backgroundColor: '#ffb2cf',
        },
        'deckgo-highlight-code': {
          '--deckgo-highlight-code-carbon-background': '#2b2b2b',
          '--deckgo-highlight-code-carbon-color': '#f8f8f2',
          '--deckgo-highlight-code-token-atrule': '#ffa07a',
          '--deckgo-highlight-code-token-comment': '#606060',
          '--deckgo-highlight-code-token-comment-rgb': '212, 208, 171',
          '--deckgo-highlight-code-token-function': '#00e0e0',
          '--deckgo-highlight-code-token-operator': '#abe338',
          '--deckgo-highlight-code-token-function': '#00e0e0',
          '--deckgo-highlight-code-token-punctuation': '#ffd700',
          '--deckgo-highlight-code-token-regex': '#f8f8f2',
          '--deckgo-highlight-code-token-selector': '#f8f8f2',
        },
      },
    },
  },
});
