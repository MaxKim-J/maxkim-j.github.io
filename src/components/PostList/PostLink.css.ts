import { style } from '@vanilla-extract/css';
import { sVar } from '../../styles/variants';

export const listItemLinkStyle = style({});

export const listItemStyle = style({
  marginBottom: '38px',
  lineHeight: 1.3,
  width: 'fit-content',
});

export const listItemTitleStyle = style({
  fontSize: sVar.fontSize.$3,
  fontWeight: sVar.fontWeight.semiBold,
  display: 'block',
  '@media': {
    [sVar.media.mobile]: {
      fontSize: sVar.fontSize.$4,
    },
  },
});

export const listItemDescriptionStyle = style({
  fontSize: sVar.fontSize.$7,
  '@media': {
    [sVar.media.mobile]: {
      fontSize: sVar.fontSize.$8,
    },
  },
});

export const orderedListItemStyle = style({
  padding: '12px 0',
});
