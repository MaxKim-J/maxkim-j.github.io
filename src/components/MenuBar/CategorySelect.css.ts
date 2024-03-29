import { style } from '@vanilla-extract/css';
import { sVar } from '../../styles/variants';

export const labelStyle = style({
  fontSize: sVar.fontSize.$5,
  marginRight: '10px',
});

export const selectStyle = style({
  fontSize: sVar.fontSize.$6,
  width: '80px',
  marginRight: '18px',
});
