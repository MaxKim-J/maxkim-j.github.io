import React, { ReactChildren } from 'react';
import { styled } from '../../styles/stitches';
import globalStyle from '../../styles/global';

interface Props {
  header: ReactChildren;
  main: ReactChildren;
  footer: ReactChildren;
}

// themeColor을 위에서 받아야함

function MainLayout({ main, header, footer }: Props) {
  globalStyle();

  // header에서 결정해줘야하는데 이게좀 애매취하군
  // context api?

  return (
    <ContainerWrapper>
      <ResponsiveContainer>
        <header>{header}</header>
        <main>{main}</main>
        <header>{footer}</header>
      </ResponsiveContainer>
    </ContainerWrapper>
  );
}

const ContainerWrapper = styled('div', {
  width: '100vw',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'green',
});

const ResponsiveContainer = styled('div', {
  backgroundColor: '$white',
  padding: '12px',
  width: '1060px',
  '@tablet': {
    width: '760px',
  },
  '@mobile': {
    width: '100%',
    '& *': {
      fontSize: '$body2',
    },
    '& h1': {
      fontSize: '$heading2',
    },
    '& h2': {
      fontSize: '$heading3',
    },
    '& h3': {
      fontSize: '$heading4',
    },
    '& h4': {
      fontSize: 'body1',
    },
  },
});

export default MainLayout;
