import { style } from '@vanilla-extract/css';
import { sVar } from '../../styles/variants';

export const personalSectionStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: sVar.fontSize.$6,
});

export const socialMediaSectionStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const socialMediaLinkStyle = style({
  marginLeft: '20px',
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export const sharedSectionStyle = style({
  marginTop: '20px',
  display: 'flex',
  fontSize: sVar.fontSize.$6,
});

export const sharedSectionActionButtonStyle = style({
  marginRight: '18px',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export const bottomNavSectionStyle = style({
  margin: '20px 0 60px 0',
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: sVar.fontSize.$6,
});

export const bottomNavLinkStyle = style({
  marginLeft: '20px',
});
