import { style } from '@vanilla-extract/css';
import { sVar } from '../styles/variants';

export const footerSectionStyle = style({
  marginTop: '32px',
  display: 'flex',
  height: '32px',
  alignItems: 'center',
  justifyContent: 'space-between',
  bottom: 0,
  zIndex: 10,
});

export const footerContentStyle = style({
  fontSize: '10px',
});

export const footerAnchorStyle = style({
  textDecoration: 'underline',
  fontSize: '10px',
});
