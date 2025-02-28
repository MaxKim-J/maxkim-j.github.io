import { style } from '@vanilla-extract/css';
import { sVar } from '../../styles/variants';

export const postTitleWrapperStyle = style({
  marginBottom: '80px',
  marginTop: '24px',
});

export const postTitleHeadingStyle = style({
  fontSize: sVar.fontSize.$1,
  fontWeight: sVar.fontWeight.semiBold,
  lineHeight: '1.3',
  wordBreak: 'keep-all',
  marginBottom: '20px',
  '@media': {
    [sVar.media.mobile]: {
      fontSize: sVar.fontSize.$2,
    },
  },
});

export const postTitleDescriptionStyle = style({
  fontSize: sVar.fontSize.$4,
  marginBottom: '8px',
  '@media': {
    [sVar.media.mobile]: {
      fontSize: sVar.fontSize.$5,
    },
  },
});

export const postTitleTagsStyle = style({
  fontSize: sVar.fontSize.$6,
  marginLeft: '12px',
  textDecoration: 'underline',
});

export const tagAndDateContainerStyle = style({
  display: 'flex',
  alignItems: 'center',
  opacity: 0.6,
});

export const dateStyle = style({
  fontSize: sVar.fontSize.$6,
  marginTop: '2px',
});
