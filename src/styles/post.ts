import { globalCss } from './stitches';

// post
const postStyles = globalCss({
  p: { marginBottom: '24px', wordWrap: 'break-word', lineHeight: 1.6 },
  h1: {
    margin: '32px 0',
  },
  h2: {
    margin: '28px 0',
  },
  h3: {
    margin: '24px 0',
  },
  h4: {
    margin: '20px 0',
  },
  h5: {
    margin: '16px 0',
  },
  'p a': {
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
  },
  '.gatsby-resp-image-wrapper': {
    marginBottom: '40px',
    width: '80%',
  },
  blockquote: {
    borderLeft: '3px solid $black',
    paddingLeft: '10px',
    margin: '20px 0',
    fontStyle: 'italic',
  },
});

export default postStyles;
