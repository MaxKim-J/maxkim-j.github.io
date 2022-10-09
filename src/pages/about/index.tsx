import React from 'react';

import ProfileImage from '../../images/profile.jpeg';

import { styled } from '../../styles/stitches';

import Footer from '../../components/@layout/Footer';
import Header from '../../components/@layout/Header/Header';

import MainLayout from '../../components/@layout/MainLayout';
import globalStyle from '../../styles/global';
import { Link } from 'gatsby';

export default function AboutPage() {
  globalStyle();

  return (
    <MainLayout header={<Header />} footer={<Footer />}>
      <StyledName>김종혁</StyledName>
      <img src={ProfileImage} />
      <StyledParagraph>
        <p>
          소프트웨어 개발로 생계를 꾸리고 있습니다. 복잡하고 중요한 유저의 문제를 쉽고 slick하게
          풀어내는 UI를 좋아합니다. 팀의 생산성을 향상시키는 플랫폼과 DX에 관심이 많습니다. 문제
          해결에 필요한 엔지니어링이라면 무엇이든 학습하고 실행에 옮깁니다.
        </p>
      </StyledParagraph>
      <StyledParagraph>
        <p>
          개발을 시작하기 전에는 글쓰기로 생계를 꾸려볼까 했는데 잘 안 되었습니다. 삶과 일의
          복잡함을 개인의 차원에서 잘 다뤄내는 방법을 찾고 있습니다. 어떻게 하면 지속적으로 멋있고
          새로운 것을 만들 수 있을지 고민합니다. 공동체에 기여하는 삶을 추구하고, 약자가 죽지 않아도
          되는 세상을 원합니다.
        </p>
      </StyledParagraph>
      <StyledParagraph>
        <p>이 블로그는 기술 블로그가 아닙니다.</p>
      </StyledParagraph>
      <StyledLabelSection>
        <StyledLabel>
          <StyledLabelTitle>Currently</StyledLabelTitle>
          <StyledLabelContent>
            <p>
              <strong>
                <Link to="https://flex.team">flex.team</Link>
              </strong>{' '}
              Product Engineer(FE)
            </p>
          </StyledLabelContent>
        </StyledLabel>
        <StyledLabel>
          <StyledLabelTitle>Find Me On</StyledLabelTitle>
          <StyledLabelContent>
            <Link to="https://twitter.com/max_kim_dev">twitter</Link>
            <Link to="https://github.com/MaxKim-J">github</Link>
            <Link to="https://www.linkedin.com/in/%EC%A2%85%ED%98%81-%EA%B9%80-903967177/">
              linkedin
            </Link>
            <Link to="https://github.com/MaxKim-J/RESUME">resume</Link>
          </StyledLabelContent>
        </StyledLabel>
        <StyledLabel>
          <StyledLabelTitle>Other Posts</StyledLabelTitle>
          <StyledLabelContent>
            <Link to="https://univalli.com/news/search_result.html?search=%EA%B9%80%EC%A2%85%ED%98%81&page=1">
              대학언론협동조합
            </Link>
            <Link to="https://univ20.com/?s=%EA%B9%80%EC%A2%85%ED%98%81">대학내일</Link>
            <Link to="https://brunch.co.kr/@hwaseen">브런치</Link>
          </StyledLabelContent>
        </StyledLabel>
        <StyledLabel>
          <StyledLabelTitle>Contact</StyledLabelTitle>
          <StyledLabelContent>
            <Link to="mailto:hwaseen@gmail.com">hwaseen@gmail.com</Link>
          </StyledLabelContent>
        </StyledLabel>
      </StyledLabelSection>
    </MainLayout>
  );
}

const StyledName = styled('h1', {
  fontSize: '48px',
});

const StyledParagraph = styled('div', {
  margin: '24px 0',
  p: {
    lineHeight: 1.4,
    '@mobile': {
      fontSize: '$body3',
    },
  },
});

const StyledLabelSection = styled('div', {
  marginTop: '42px',
  marginBottom: '250px',
});

const StyledLabel = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  width: '70%',
  marginBottom: '20px',
  '@mobile': {
    width: '100%',
    fontSize: '$body3',
  },
});

const StyledLabelTitle = styled('div', {
  fontWeight: '$bold',
});

const StyledLabelContent = styled('div', {
  a: {
    marginLeft: '16px',
    hoverUnderline: 'true',
  },
});
