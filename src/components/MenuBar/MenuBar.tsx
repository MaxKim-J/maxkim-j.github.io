import React from 'react';
import ThemeSelect from './ThemeSelect';
import CategorySelect from './CategorySelect';
import Menu from './Menu';

import { navWrapperStyle, navLeftStyle, navRightStyle } from './MenuBar.css';

interface Props {
  showCategory?: boolean;
}

function MenuBar({ showCategory = false }: Props) {
  return (
    <nav className={navWrapperStyle}>
      <div className={navLeftStyle}>
        <Menu />
      </div>
      <div className={navRightStyle}>
        {showCategory ? <CategorySelect /> : null}
        <ThemeSelect />
      </div>
    </nav>
  );
}

export default MenuBar;
