import React from 'react';
import { Link } from 'gatsby';
import { styled } from '../../styles/stitches';
import ThemeSelect from './ThemeSelect';
import CategorySelect from './CategorySelect';

function MenuBar() {
  return (
    <NavSection>
      <LeftSide>
        <div>
          <Link to="/pic" aria-label="제가 찍은 사진들이 있는 페이지로 이동해요">
            pic
          </Link>
        </div>
        <div>
          <Link to="/about" aria-label="제가 누구인지 보실 수 있는 페이지로 이동해요">
            about
          </Link>
        </div>
        <div>
          <Link to="/rss.xml" aria-label="rss 페이지로 이동해요">
            rss
          </Link>
        </div>
      </LeftSide>
      <RightSide>
        <div>theme</div>
        <ThemeSelect pos="main" />
        <div>filter</div>
        <CategorySelect />
      </RightSide>
    </NavSection>
  );
}

const NavSection = styled('nav', {
  display: 'flex',
  justifyContent: 'space-between',
  '@mobile': {
    display: 'block',
  },
});

const LeftSide = styled('div', {});

const RightSide = styled('div', {
  display: 'flex',
  alignItems: 'center',
  '& >div': {
    margin: '0 7px',
  },
  '@mobile': {
    fontSize: '12px',
  },
});

export default MenuBar;
