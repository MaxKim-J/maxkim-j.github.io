import React, { ReactNode } from 'react';

import {
  containerWrapperStyle,
  navLayoutStyle,
  mainLayoutStyle,
  containerStyle,
} from './Layout.css';

interface Props {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
  nav: ReactNode;
  googleAd?: boolean;
}

function MainLayout({ children, nav, footer }: Props) {
  return (
    <div className={containerWrapperStyle}>
      <div className={containerStyle}>
        <nav className={navLayoutStyle}>{nav}</nav>
        <main className={mainLayoutStyle}>{children}</main>
        <footer>{footer}</footer>
      </div>
    </div>
  );
}

export default MainLayout;
