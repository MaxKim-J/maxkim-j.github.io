import { style } from '@vanilla-extract/css';
import { sVar } from '../../styles/variants';

export const listItemLinkStyle = style({});

export const listItemStyle = style({
  marginBottom: '20px',
  lineHeight: 1.3,
});

export const listItemWrapperStyle = style({
  display: 'grid',
  gridTemplateColumns: '120px auto 1fr',
  alignItems: 'center',
  '@media': {
    [sVar.media.mobile]: {
      display: 'block',
    },
  },
});

export const listItemDateStyle = style({
  fontSize: sVar.fontSize.$7,
  fontWeight: sVar.fontWeight.regular,
  '@media': {
    [sVar.media.mobile]: {},
  },
});

export const listItemCategoryStyle = style({
  fontSize: sVar.fontSize.$8,
  fontWeight: sVar.fontWeight.thin,
  marginTop: '5px',
  '@media': {
    [sVar.media.mobile]: {
      display: 'none',
    },
  },
});

export const listItemTitleStyle = style({
  fontSize: sVar.fontSize.$5,
  fontWeight: sVar.fontWeight.semiBold,
  paddingRight: '6px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  flexGrow: 1,
  '@media': {
    [sVar.media.mobile]: {
      fontWeight: sVar.fontWeight.semiBold,
      whiteSpace: 'break-spaces',
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
