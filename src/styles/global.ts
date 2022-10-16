import { globalCss } from './stitches';

// default
const globalStyles = globalCss({
  '*': {
    fontFamily: 'Pretendard',
  },
  'p, body': { margin: 0, padding: 0, fontSize: '$body1' },
  a: { textDecoration: 'none' },
  img: { width: '100%', height: 'auto' },
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
