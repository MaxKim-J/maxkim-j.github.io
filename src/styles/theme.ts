import { css } from './stitches';

export const none = css({
  color: '$black',
  ' a': {
    color: '$black',
  },
  ' p': {
    color: '$black',
  },
  'p > code': {
    backgroundColor: '#efefef',
  },
  'deckgo-highlight-code': {
    '--deckgo-highlight-code-carbon-background': '#f5f5f5',
    '--deckgo-highlight-code-carbon-color': '#202020',
    '--deckgo-highlight-code-token-atrule': '#a626a4',
    '--deckgo-highlight-code-token-comment': '#65737e',
    '--deckgo-highlight-code-token-comment-rgb': '101, 115, 126',
    '--deckgo-highlight-code-token-function': '#ac4142',
    '--deckgo-highlight-code-token-operator': '#202020',
    '--deckgo-highlight-code-token-property': '#ac4142',
    '--deckgo-highlight-code-token-punctuation': '#202020',
    '--deckgo-highlight-code-token-regex': '#f4bf75',
    '--deckgo-highlight-code-token-selector': '#90a959',
  },
});

export const dark = css({
  backgroundColor: '$dark',
  color: '$white',
  ' a': {
    color: '$white',
  },
  ' p': {
    color: '$white',
  },
  'p > code': {
    backgroundColor: '#6b6b6b',
  },
  'input[type=range]': {
    backgroundColor: '$white',
  },
  'input[type=range]::-webkit-slider-thumb': {
    backgroundColor: '$white',
  },
  'deckgo-highlight-code': {
    '--deckgo-highlight-code-carbon-background': '#2b2b2b',
    '--deckgo-highlight-code-carbon-color': '#f8f8f2',
    '--deckgo-highlight-code-token-atrule': '#ffa07a',
    '--deckgo-highlight-code-token-comment': '#606060',
    '--deckgo-highlight-code-token-comment-rgb': '212, 208, 171',
    '--deckgo-highlight-code-token-function': '#00e0e0',
    '--deckgo-highlight-code-token-operator': '#abe338',
    '--deckgo-highlight-code-token-function': '#00e0e0',
    '--deckgo-highlight-code-token-punctuation': '#ffd700',
    '--deckgo-highlight-code-token-regex': '#f8f8f2',
    '--deckgo-highlight-code-token-selector': '#f8f8f2',
  },
});

export const orange = css({
  backgroundColor: '$orange',
  color: '$black',
  ' a': {
    color: '$black',
  },
  ' p': {
    color: '$black',
  },
  'p > code': {
    backgroundColor: '#ffc68e',
  },
  'deckgo-highlight-code': {
    '--deckgo-highlight-code-carbon-background': '#2b2b2b',
    '--deckgo-highlight-code-carbon-color': '#f8f8f2',
    '--deckgo-highlight-code-token-atrule': '#ffa07a',
    '--deckgo-highlight-code-token-comment': '#606060',
    '--deckgo-highlight-code-token-comment-rgb': '212, 208, 171',
    '--deckgo-highlight-code-token-function': '#00e0e0',
    '--deckgo-highlight-code-token-operator': '#abe338',
    '--deckgo-highlight-code-token-function': '#00e0e0',
    '--deckgo-highlight-code-token-punctuation': '#ffd700',
    '--deckgo-highlight-code-token-regex': '#f8f8f2',
    '--deckgo-highlight-code-token-selector': '#f8f8f2',
  },
});

export const turquoise = css({
  backgroundColor: '$turquoise',
  color: '$black',
  ' a': {
    color: '$black',
  },
  ' p': {
    color: '$black',
  },
  'p > code': {
    backgroundColor: '#a8ffef',
  },
  'deckgo-highlight-code': {
    '--deckgo-highlight-code-carbon-background': '#2b2b2b',
    '--deckgo-highlight-code-carbon-color': '#f8f8f2',
    '--deckgo-highlight-code-token-atrule': '#ffa07a',
    '--deckgo-highlight-code-token-comment': '#606060',
    '--deckgo-highlight-code-token-comment-rgb': '212, 208, 171',
    '--deckgo-highlight-code-token-function': '#00e0e0',
    '--deckgo-highlight-code-token-operator': '#abe338',
    '--deckgo-highlight-code-token-function': '#00e0e0',
    '--deckgo-highlight-code-token-punctuation': '#ffd700',
    '--deckgo-highlight-code-token-regex': '#f8f8f2',
    '--deckgo-highlight-code-token-selector': '#f8f8f2',
  },
});

export const pink = css({
  backgroundColor: '$pink',
  color: '$black',
  ' a': {
    color: '$black',
  },
  ' p': {
    color: '$black',
  },
  'p > code': {
    backgroundColor: '#ffb2cf',
  },
  'deckgo-highlight-code': {
    '--deckgo-highlight-code-carbon-background': '#2b2b2b',
    '--deckgo-highlight-code-carbon-color': '#f8f8f2',
    '--deckgo-highlight-code-token-atrule': '#ffa07a',
    '--deckgo-highlight-code-token-comment': '#606060',
    '--deckgo-highlight-code-token-comment-rgb': '212, 208, 171',
    '--deckgo-highlight-code-token-function': '#00e0e0',
    '--deckgo-highlight-code-token-operator': '#abe338',
    '--deckgo-highlight-code-token-function': '#00e0e0',
    '--deckgo-highlight-code-token-punctuation': '#ffd700',
    '--deckgo-highlight-code-token-regex': '#f8f8f2',
    '--deckgo-highlight-code-token-selector': '#f8f8f2',
  },
});

export default {
  none,
  pink,
  dark,
  turquoise,
  orange,
};
