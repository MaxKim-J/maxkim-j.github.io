import React, { ReactNode } from 'react';

import {
  containerWrapperStyle,
  headerLayoutStyle,
  navLayoutStyle,
  mainLayoutStyle,
  containerStyle,
} from './Layout.css';

interface Props {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
  nav: ReactNode;
}

function MainLayout({ children, nav, header, footer }: Props) {
  return (
    <div className={containerWrapperStyle}>
      <div className={containerStyle}>
        <header className={headerLayoutStyle}>{header}</header>
        <nav className={navLayoutStyle}>{nav}</nav>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5727170943665894"
          data-ad-slot="7957978465"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        <main className={mainLayoutStyle}>{children}</main>
        <footer>{footer}</footer>
      </div>
    </div>
  );
}

export default MainLayout;
