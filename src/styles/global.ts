import { globalCss } from './stitches';

// default
const globalStyles = globalCss({
  '*': {
    fontFamily: 'Pretendard',
  },
  'p, body': { margin: 0, padding: 0, color: '$black', fontSize: '$body1' },
  a: { textDecoration: 'none', color: '$black' },
  h1: {
    fontSize: '$heading1',
  },
  h2: {
    fontSize: '$heading2',
  },
  h3: {
    fontSize: '$heading3',
  },
  h4: {
    fontSize: '$heading4',
  },
  h5: {
    fontSize: '$heading5',
  },
});

export default globalStyles;
