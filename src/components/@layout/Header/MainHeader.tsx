import { Link } from 'gatsby';
import React from 'react';
import { styled } from '../../../styles/stitches';

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
          <div>all</div>
        </LeftSide>
        <RightSide>
          <div>color</div>
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
  marginBottom: '84px',
});

const TitleSection = styled('div', {});

const TitleWrapper = styled('div', {
  marginBottom: '16px',
  '&>div': {
    fontSize: '$title',
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
});

const LeftSide = styled('div', {});

const RightSide = styled('div', {
  display: 'flex',
  alignItems: 'center',
  '& div': {
    marginLeft: '15px',
  },
});

export default MainHeader;
