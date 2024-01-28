import { Link } from 'gatsby';
import React from 'react';

import { mainTitleStyle } from './Header.css';

function Header() {
  return (
    <Link to="/">
      <div className={mainTitleStyle}>김맥스 블로그</div>
    </Link>
  );
}

export default Header;
