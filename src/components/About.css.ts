import { style } from '@vanilla-extract/css';
import { sVar } from '../styles/variants';

export const nameStyle = style({
  fontSize: sVar.fontSize.$0,
  fontWeight: sVar.fontWeight.semiBold,
});

export const infoSectionStyle = style({
  marginTop: '42px',
  marginBottom: '250px',
});

export const infoStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '70%',
  marginBottom: '20px',
  '@media': {
    [sVar.media.mobile]: {
      width: '100%',
      fontSize: sVar.fontSize.$6,
    },
  },
});

export const infoTitleStyle = style({
  fontWeight: sVar.fontWeight.semiBold,
});

export const infoAnchorStyle = style({
  marginLeft: '16px',
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});
