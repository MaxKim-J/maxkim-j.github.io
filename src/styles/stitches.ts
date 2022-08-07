import { createStitches } from '@stitches/react';

export const { styled, css, getCssText, globalCss, createTheme } =
  createStitches({
    theme: {
      fonts: {
        system: 'system-ui',
      },
      colors: {
        black: '#000000',
        white: '#ffffff',
      },
      fontSizes: {
        title: '56px',
        heading1: '32px',
        heading2: '28px',
        heading3: '24px',
        heading4: '20px',
        body1: '18px',
        body2: '16px',
        body3: '14px',
        body4: '12px',
      },
    },
    media: {
      tablet: '(max-width: 1060px)',
      mobile: '(max-width: 420px)',
    },
  });
