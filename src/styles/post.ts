import { globalCss } from './stitches';

// post
const postStyles = globalCss({
  p: { marginBottom: '24px', wordWrap: 'break-word', lineHeight: 1.6 },
  h1: {
    marginTop: '48px',
    marginBottom: '36px',
  },
  h2: {
    margin: '32px 0',
  },
  h3: {
    margin: '28px 0',
  },
  h4: {
    margin: '24px 0',
  },
  h5: {
    margin: '20px 0',
  },
  'p a': {
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
  },
  blockquote: {
    borderLeft: '3px solid $black',
    paddingLeft: '10px',
    margin: '20px 0',
    fontStyle: 'italic',
  },
  'deckgo-highlight-code': {
    '--deckgo-highlight-code-white-space': 'pre',
    '--deckgo-highlight-code-margin': '12px 0 16px 0',
  },
});

export default postStyles;
