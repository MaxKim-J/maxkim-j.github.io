import { style } from '@vanilla-extract/css';
import { sVar } from '../styles/variants';

export const nameStyle = style({
  fontSize: sVar.fontSize.$0,
  fontWeight: sVar.fontWeight.semiBold,
});
