import { globalCss } from './stitches';

// default
const globalStyles = globalCss({
  img: {
    pointerEvents: 'none',
  },
  '.description': {
    fontSize: '$description',
    color: 'gray',
    textAlign: 'center',
    width: '100%',
    marginBottom: '100px',
    marginTop: '8px',
  },
});

export default globalStyles;
