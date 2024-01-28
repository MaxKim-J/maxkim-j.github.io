import { style } from '@vanilla-extract/css';
import { sVar } from '../styles/variants';

export const tagTitleStyle = style({
  fontSize: sVar.fontSize.$2,
  marginBottom: '60px',
  fontWeight: sVar.fontWeight.semiBold,
});
