import { style } from '@vanilla-extract/css';
import { sVar } from '../../styles/variants';

export const navWrapperStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  '@media': {
    [sVar.media.mobile]: { flexDirection: 'column' },
  },
});

export const navLeftStyle = style({});

export const navRightStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '@media': {
    [sVar.media.mobile]: {
      justifyContent: 'flex-start',
      marginTop: '12px',
    },
  },
});
