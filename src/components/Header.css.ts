import { style } from '@vanilla-extract/css';
import { sVar } from '../styles/variants';

export const mainTitleStyle = style({
  fontSize: sVar.fontSize.$0,
  fontWeight: sVar.fontWeight.bold,
  '@media': {
    [sVar.media.mobile]: {
      fontSize: sVar.fontSize.$1,
    },
  },
});
