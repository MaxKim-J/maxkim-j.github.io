import { style, styleVariants } from '@vanilla-extract/css';
import { sVar } from '../styles/variants';

export const categoryChipsWrapperStyle = style({ marginTop: '12px' });

const categoryChipsBaseStyle = style({
  marginRight: '12px',
  fontSize: sVar.fontSize.$5,
  cursor: 'pointer',
  letterSpacing: '0.5px',
});

export const categoryChipsStyle = styleVariants({
  default: [categoryChipsBaseStyle],
  here: [
    categoryChipsBaseStyle,
    { textDecoration: 'underline', textDecorationThickness: '1.8px', textUnderlineOffset: '3.7px' },
  ],
});

export const categoryChipsCountStyle = style({
  fontSize: sVar.fontSize.$6,
});
