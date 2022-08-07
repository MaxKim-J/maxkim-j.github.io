import React, { ReactChildren } from 'react';
import { styled } from '../../styles/stitches';
import globalStyle from '../../styles/global';

import '../../styles/font.css';

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
        <Main>{main}</Main>
        <footer>{footer}</footer>
      </ResponsiveContainer>
    </ContainerWrapper>
  );
}

const ContainerWrapper = styled('div', {
  width: '100vw',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: '#ffbb32',
});

const ResponsiveContainer = styled('div', {
  backgroundColor: '$white',
  padding: '24px 18px 0px 18px',
  boxSizing: 'border-box',
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

const Main = styled('main', {
  minHeight: '700px',
});

export default MainLayout;
