import React from 'react';
import { Link } from 'gatsby';

import { menuLinkStyle } from './Menu.css';

function MenuBar() {
  return (
    <>
      <Link
        className={menuLinkStyle}
        to="/about"
        aria-label="제가 누구인지 보실 수 있는 페이지로 이동해요"
      >
        about
      </Link>
      <Link
        className={menuLinkStyle}
        to="/pic"
        aria-label="제가 찍은 사진들이 있는 페이지로 이동해요"
      >
        pic
      </Link>
      <Link className={menuLinkStyle} to="/rss.xml" aria-label="rss 페이지로 이동해요">
        rss
      </Link>
    </>
  );
}

export default MenuBar;
