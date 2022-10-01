import React from 'react';
import { Link } from 'gatsby';
import { styled } from '../../../styles/stitches';

import Tooltip from '../../@fundamentals/Tooltip';
import ThemeTooltip from './ThemeTooltip';

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
          <Tooltip
            tooltip={
              <div>
                <div>다크</div>
              </div>
            }
          >
            <div>all</div>
          </Tooltip>
        </LeftSide>
        <RightSide>
          <Tooltip tooltip={<ThemeTooltip />}>
            <div>color</div>
          </Tooltip>
          <div>
            <Link to="/photo">photo</Link>
          </div>
          <div>
            <Link to="/about">about</Link>
          </div>
        </RightSide>
      </NavSection>
    </MainHeaderWrapper>
  );
}

const MainHeaderWrapper = styled('div', {
  marginBottom: '100px',
});

const TitleSection = styled('div', {});

const TitleWrapper = styled('div', {
  marginBottom: '16px',
  '&>div': {
    fontSize: '$mainTitle',
    fontWeight: '$extraBold',
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
});

const LeftSide = styled('div', {});

const RightSide = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: '180px',
});

export default MainHeader;
