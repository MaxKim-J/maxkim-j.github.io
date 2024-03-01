import React, { createRef, useLayoutEffect } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { Theme } from '../../types';

const attributes = {
  src: 'https://giscus.app/client.js',
  'data-repo': 'MaxKim-J/maxkim-j.github.io',
  'data-repo-id': 'MDEwOlJlcG9zaXRvcnkyNDc2ODY5OTA=',
  'data-category': 'Announcements',
  'data-category-id': 'DIC_kwDODsNnTs4CcvsW',
  'data-mapping': 'url',
  'data-strict': '0',
  'data-reactions-enabled': '1',
  'data-emit-metadata': '0',
  'data-input-position': 'bottom',
  'data-theme': 'light',
  'data-lang': 'en',
  crossorigin: 'anonymous',
  async: 'true',
};

const themeMap: Record<Theme, string> = {
  light: 'light',
  dark: 'noborder_dark',
};

function Comments() {
  const containerRef = createRef<HTMLDivElement>();
  const theme = useThemeStore((state) => state.theme);

  useLayoutEffect(() => {
    const giscus = document.createElement('script');

    attributes['data-theme'] = themeMap[theme];

    Object.entries(attributes).forEach(([key, value]) => {
      giscus.setAttribute(key, value);
    });

    if (containerRef.current) {
      containerRef.current.appendChild(giscus);
    }

    return () => {
      giscus.remove();
    };
  }, [containerRef, theme]);

  return <div ref={containerRef} />;
}

export default Comments;
