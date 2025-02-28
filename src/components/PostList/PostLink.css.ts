import { style } from '@vanilla-extract/css';
import { sVar } from '../../styles/variants';

export const listItemLinkStyle = style({});

export const listItemStyle = style({
  lineHeight: 1.3,
  marginBottom: '4px',
  padding: '8px 4px',
  borderRadius: '4px',
  ':hover': {
    backgroundColor: 'var(--code-quote-background-color)',
    transition: 'background-color 0.4s cubic-bezier(0.3, 0, 0.2, 1)',
  },
});

export const listItemWrapperStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media': {
    [sVar.media.mobile]: {
      display: 'block',
    },
  },
});

export const listItemDateStyle = style({
  fontSize: sVar.fontSize.$6,
  fontWeight: sVar.fontWeight.regular,
  width: '83px',
  textAlign: 'left',
  '@media': {
    [sVar.media.mobile]: {
      fontWeight: sVar.fontWeight.thin,
    },
  },
});

export const listItemCategoryStyle = style({
  fontSize: sVar.fontSize.$8,
  fontWeight: sVar.fontWeight.thin,
  marginTop: '5px',
  marginLeft: '5px',
  '@media': {
    [sVar.media.mobile]: {
      display: 'none',
    },
  },
});

export const listItemTitleStyle = style({
  fontSize: sVar.fontSize.$5,
  fontWeight: 550,
  paddingRight: '6px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  flexGrow: 1,
  '@media': {
    [sVar.media.mobile]: {
      fontWeight: 550,
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
