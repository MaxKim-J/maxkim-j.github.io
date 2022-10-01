import React, { ReactChildren, useState } from 'react';
import { styled } from '../../styles/stitches';
import globalStyle from '../../styles/global';
import { themeContext, ThemeContextProvider, type Theme } from '../../context/themeContext';

import '../../styles/font.css';

interface Props {
  header: ReactChildren;
  children: ReactChildren;
  footer: ReactChildren;
}

function MainLayout({ children, header, footer }: Props) {
  globalStyle();

  return (
    <ThemeContextProvider>
      <ContainerWrapper>
        <ResponsiveContainer>
          <header>{header}</header>
          <Main>{children}</Main>
          <footer>{footer}</footer>
        </ResponsiveContainer>
      </ContainerWrapper>
    </ThemeContextProvider>
  );
}

const ContainerWrapper = styled('div', {
  width: '100vw',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
});

const ResponsiveContainer = styled('div', {
  padding: '24px 18px 0px 18px',
  boxSizing: 'border-box',
  width: '900px',
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
