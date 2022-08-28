import { createStitches } from '@stitches/react';

export const { styled, css, getCssText, globalCss, createTheme } =
  createStitches({
    theme: {
      fonts: {
        system: 'system-ui',
      },
      colors: {
        black: '#000000',
        dark: '#232323',
        white: '#ffffff',
        orange: '#ffb566',
        turquoise: '#8cffd6',
        pink: '#ffa5e4',
      },
      fontSizes: {
        mainTitle: '30px',
        title: '28px',
        subTitle: '24px',
        mobileTitle: '20px',
        description: '14px',
        mobileDescription: '10px',
        heading1: '32px',
        heading2: '28px',
        heading3: '24px',
        heading4: '20px',
        body1: '18px',
        body2: '16px',
        body3: '14px',
        body4: '12px',
      },
      fontWeights: {
        extraBold: '700',
        bold: '550',
        regular: '500',
        thin: '300',
      },
    },
    media: {
      tablet: '(max-width: 1060px)',
      mobile: '(max-width: 420px)',
    },
  });
