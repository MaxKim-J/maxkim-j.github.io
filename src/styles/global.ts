import { globalCss } from './stitches';

// default
const globalStyles = globalCss({
  '*': {
    fontFamily: 'Pretendard',
  },
  'p, body': { margin: 0, padding: 0, fontSize: '$body1' },
  strong: { fontWeight: '$bold' },
  a: {
    textDecoration: 'none',
    '&:link': {
      color: '$black',
    },
    '&:visited': {
      color: '$black',
    },
  },
  img: { width: '100%', height: 'auto' },
  ol: {
    listStyleType: 'none',
    marginBlockStart: 0,
    marginBlockEnd: 0,
    marginInlineStart: 0,
    marginInlineEnd: 0,
    paddingInlineStart: 0,
  },
  h1: {
    fontSize: '$heading1',
    fontWeight: '$bold',
  },
  h2: {
    fontSize: '$heading2',
    fontWeight: '$bold',
  },
  h3: {
    fontSize: '$heading3',
    fontWeight: '$bold',
  },
  h4: {
    fontSize: '$heading4',
    fontWeight: '$bold',
  },
  h5: {
    fontSize: '$heading5',
    fontWeight: '$bold',
  },
});

export default globalStyles;
