import { style } from '@vanilla-extract/css';
import { sVar } from '../../styles/variants';

export const menuLinkStyle = style({
  marginRight: '20px',
  fontSize: sVar.fontSize.$4,
  '@media': {
    [sVar.media.mobile]: {
      fontSize: sVar.fontSize.$5,
    },
  },
});
