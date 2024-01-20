import React, { createRef, useLayoutEffect } from 'react';

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

    if (containerRef.current) {
      containerRef.current.appendChild(utterances);
    }
  }, [containerRef]);

  return <div ref={containerRef} />;
}

export default Utterances;
