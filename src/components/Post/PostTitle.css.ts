import { style } from '@vanilla-extract/css';
import { sVar } from '../../styles/variants';

export const postTitleWrapperStyle = style({
  marginBottom: '60px',
});

export const postTitleHeadingStyle = style({
  fontSize: sVar.fontSize.$1,
  fontWeight: sVar.fontWeight.semiBold,
  lineHeight: '1.3',
  wordBreak: 'keep-all',
  marginBottom: '20px',
  '@media': {
    [sVar.media.mobile]: {
      fontSize: '30px',
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
  fontSize: sVar.fontSize.$7,
  marginRight: '12px',
  textDecoration: 'underline',
});
