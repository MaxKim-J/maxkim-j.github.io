import React, { createRef, useLayoutEffect } from 'react';
import { css } from '../../../styles/stitches';

function Utterances() {
  const containerRef = createRef<HTMLDivElement>();

  useLayoutEffect(() => {
    const utterances = document.createElement('script');

    const attributes = {
      src: 'https://utteranc.es/client.js',
      repo: 'MaxKim-J/maxkim-j.github.io',
      theme: 'github-light',
      'issue-term': 'pathname',
      crossOrigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    containerRef.current.appendChild(utterances);
  }, [containerRef]);

  return <div className={utteranceStyle()} ref={containerRef} />;
}

const utteranceStyle = css({
  '.utterances': {
    maxWidth: 'none',
  },
  'iframe main.timeline': {
    padding: 0,
  },
});

export default Utterances;
