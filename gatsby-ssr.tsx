import * as React from 'react';

export const onRenderBody = ({ setPreBodyComponents }) => {
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
  setPreBodyComponents(
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5727170943665894"
      crossorigin="anonymous"
    ></script>
  );
};
