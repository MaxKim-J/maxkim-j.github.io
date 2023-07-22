import React from 'react';
import { Link } from 'gatsby';
import { styled } from '../../../styles/stitches';

import ThemeSelect from './ThemeSelect';
import CategorySelect from './CategorySelect';

function MainHeader() {
  return (
    <MainHeaderWrapper>
      <TitleSection>
        <Link to="/">
          <TitleWrapper aria-label="블로그 타이틀">
            <div>김맥스 블로그</div>
          </TitleWrapper>
        </Link>
        <SubTitleWrapper aria-label="블로그 서브 타이틀">
          <div>그때그때 필요한 엔지니어링</div>
          <div>기록이 필요한 생각과 경험들</div>
        </SubTitleWrapper>
      </TitleSection>
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
    </MainHeaderWrapper>
  );
}

const MainHeaderWrapper = styled('div', {
  marginBottom: '70px',
});

const TitleSection = styled('section', {});

const TitleWrapper = styled('div', {
  marginBottom: '16px',
  '&>div': {
    fontSize: '$mainTitle',
    fontWeight: '$bold',
    '@mobile': {
      fontSize: '$subTitle',
    },
  },
});

const SubTitleWrapper = styled(TitleWrapper, {
  lineHeight: 1.3,
  marginBottom: '38px',
});

const NavSection = styled('nav', {
  display: 'flex',
  justifyContent: 'space-between',
  '@mobile': {
    display: 'block',
  },
});

const LeftSide = styled('section', {
  display: 'flex',
  minWidth: '180px',
  '&>div': {
    marginRight: '20px',
  },
});

const RightSide = styled('section', {
  marginBottom: '28px',
  display: 'flex',
  '&>div': {
    marginRight: '4px',
  },

  '@mobile': {
    marginTop: '12px',
    marginBottom: 0,
  },
});

export default MainHeader;
