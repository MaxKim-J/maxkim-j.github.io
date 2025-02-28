import { style } from '@vanilla-extract/css';
import { sVar } from '../../styles/variants';

export const labelStyle = style({
  fontSize: sVar.fontSize.$4,
  marginRight: '10px',
});

export const selectStyle = style({
  fontSize: sVar.fontSize.$5,
  width: '80px',
});
