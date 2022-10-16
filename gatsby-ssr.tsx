import * as React from 'react';
import { getCssText } from './src/styles/stitches';

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  const script = `
    const savedTheme = localStorage.getItem('maxkim-blog-theme');
    const theme = savedTheme || 'light';
    
    window.__theme = theme;
    window.__setTheme = (newTheme) => {
      document.body.setAttribute("data-theme", newTheme);
      localStorage.setItem('maxkim-blog-theme', newTheme);
    };

    window.__setTheme(theme);
  `;

  setPreBodyComponents(<script dangerouslySetInnerHTML={{ __html: script }} />);

  setHeadComponents([
    <style
      key="stitches"
      id="stitches"
      dangerouslySetInnerHTML={{
        __html: getCssText(),
      }}
    />,
  ]);
};
