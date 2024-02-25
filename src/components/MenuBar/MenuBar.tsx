import React from 'react';
import ThemeSelect from './ThemeSelect';
import Menu from './Menu';

import { navWrapperStyle, navLeftStyle, navRightStyle } from './MenuBar.css';
import { LangSelect } from './LangSelect';

function MenuBar() {
  return (
    <nav className={navWrapperStyle}>
      <div className={navLeftStyle}>
        <Menu />
      </div>
      <div className={navRightStyle}>
        <LangSelect />
        <ThemeSelect />
      </div>
    </nav>
  );
}

export default MenuBar;
