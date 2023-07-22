import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { styled, css } from '../../styles/stitches';
import Footer from '../../components/@layout/Footer';
import Header from '../../components/@layout/Header/Header';
import MainLayout from '../../components/@layout/MainLayout';
import globalStyle from '../../styles/global';
import postStyles from '../../styles/post';
import MetaHead from '../../components/@fundamentals/MetaHead';

export default function AboutPage({ data }: { data: { mdx: { body: string } } }) {
  globalStyle();
  postStyles();

  const { body } = data.mdx;

  return (
    <MainLayout header={<Header />} footer={<Footer />}>
      <StyledName>김종혁</StyledName>
      <MDXRenderer css={StyledMdxRenderer()}>{body}</MDXRenderer>
      <StyledLabelSection>
        <StyledLabel>
          <StyledLabelTitle>Currently</StyledLabelTitle>
          <StyledLabelContent>
            <strong>
              <Link to="https://flex.team">flex.team</Link>
            </strong>{' '}
            Product Engineer(FE)
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

const StyledLabelSection = styled('div', {
  marginTop: '42px',
  marginBottom: '250px',
});

const StyledMdxRenderer = css({
  'p span': {
    marginLeft: 0,
  },
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

export const query = graphql`
  query ABOUT_QUERY {
    mdx(frontmatter: { title: { eq: "about" } }) {
      id
      slug
      body
      frontmatter {
        title
        description
      }
    }
  }
`;

export const Head = () => {
  return <MetaHead title="김맥스 블로그 | about" description="안녕하세요 김종혁입니다." />;
};
