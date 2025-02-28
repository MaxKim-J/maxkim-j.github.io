import { style } from '@vanilla-extract/css';
import { sVar } from '../styles/variants';

export const containerWrapperStyle = style({
  minHeight: '100vh',
  padding: '16px',
  display: 'flex',
  justifyContent: 'center',
});

export const containerStyle = style({
  width: '720px',
  '@media': {
    [sVar.media.mobile]: { width: '100%' },
  },
  // TODO:theme
});

export const headerLayoutStyle = style({
  margin: '12px 0',
});

export const navLayoutStyle = style({
  padding: '0px 4px',
  marginTop: '30px',
  marginBottom: '60px',
});

export const mainLayoutStyle = style({
  margin: '0px 0px 60px 0',
  minHeight: '700px',
});
