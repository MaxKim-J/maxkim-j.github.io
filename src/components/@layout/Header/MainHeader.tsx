import React from 'react';
import { Link } from 'gatsby';
import { styled } from '../../../styles/stitches';

import Tooltip from '../../@fundamentals/Tooltip';
import ThemeTooltip from './ThemeTooltip';
import CategoryRangeInput from './CategoryRangeInput';

function MainHeader() {
  return (
    <MainHeaderWrapper>
      <TitleSection>
        <Link to="/">
          <TitleWrapper>
            <div>김맥스 블로그</div>
          </TitleWrapper>
        </Link>
        <SubTitleWrapper>
          <div>그때그때 필요한 엔지니어링</div>
          <div>기록이 필요한 생각과 경험들</div>
        </SubTitleWrapper>
      </TitleSection>
      <NavSection>
        <LeftSide>
          <Tooltip tooltip={<ThemeTooltip />}>
            <div>theme</div>
          </Tooltip>
          <div>
            <Link to="/pic">pic</Link>
          </div>
          <div>
            <Link to="/about">about</Link>
          </div>
          <div>
            <Link to="/rss.xml">rss</Link>
          </div>
        </LeftSide>
        <RightSide>
          <CategoryNotice>swipe ↔</CategoryNotice>
          <CategoryRangeInput />
        </RightSide>
      </NavSection>
    </MainHeaderWrapper>
  );
}

const MainHeaderWrapper = styled('div', {
  marginBottom: '70px',
});

const TitleSection = styled('div', {});

const CategoryNotice = styled('span', {
  fontSize: '$description',
});

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

const NavSection = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  '@mobile': {
    display: 'block',
  },
});

const LeftSide = styled('div', {
  display: 'flex',
  alignItems: 'center',
  minWidth: '180px',
  '&>div': {
    marginRight: '20px',
  },
});

const RightSide = styled('div', {
  marginBottom: '28px',
  '@mobile': {
    marginTop: '50px',
    marginBottom: 0,
  },
});

export default MainHeader;
