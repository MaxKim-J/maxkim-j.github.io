import { globalCss } from './stitches';

// post
const postStyles = globalCss({
  p: { marginBottom: '24px', wordWrap: 'break-word', lineHeight: 1.8, wordBreak: 'all' },
  h1: {
    margin: '48px 0',
  },
  h2: {
    margin: '42px 0',
  },
  h3: {
    margin: '34px 0',
  },
  h4: {
    margin: '28px 0',
  },
  h5: {
    margin: '20px 0',
  },
  'p a': {
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
  },
  'p > code': {
    padding: '2px 8px',
    borderRadius: '8px',
    fontSize: '16px',
    '@mobile': {
      fontSize: '14px',
    },
  },
  blockquote: {
    borderLeft: '3px solid $black',
    paddingLeft: '10px',
    margin: '20px 0',
    fontStyle: 'italic',
  },
  'deckgo-highlight-code': {
    '@mobile': {
      fontSize: '$body2',
    },
    '--deckgo-highlight-code-white-space': 'pre',
    '--deckgo-highlight-code-margin': '12px 0 16px 0',
    '--deckgo-highlight-code-scroll': 'none',
    '--deckgo-highlight-code-carbon-margin': '28px 0',
    '--deckgo-highlight-code-carbon-box-shadow': 'none',
  },
  li: {
    lineHeight: 1.8,
  },
  'li > a': {
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
  },
});

export default postStyles;
