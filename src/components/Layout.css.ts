import { style } from '@vanilla-extract/css';
import { sVar } from '../styles/variants';

export const containerWrapperStyle = style({
  minHeight: '100vh',
  padding: '16px',
  display: 'flex',
  justifyContent: 'center',
});

export const containerStyle = style({
  width: '50%',
  '@media': {
    [sVar.media.pcNarrow]: { width: '65%' },
    [sVar.media.tablet]: { width: '80%' },
    [sVar.media.mobile]: { width: '100%' },
  },
  // TODO:theme
});

export const headerLayoutStyle = style({
  margin: '12px 0',
});

export const navLayoutStyle = style({
  margin: '30px 0',
});

export const mainLayoutStyle = style({
  margin: '80px 0px 60px 0',
  minHeight: '700px',
});
