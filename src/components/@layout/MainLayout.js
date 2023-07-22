import React from 'react';
import { styled } from '../../styles/stitches';
// import '../../styles/font.css';
import '../../styles/theme.scss';
import { CategoryContextProvider } from '../../context/categoryContext';
function MainLayout({ children, header, footer }) {
    return (React.createElement(CategoryContextProvider, null,
        React.createElement(ContainerWrapper, null,
            React.createElement(ResponsiveContainer, null,
                React.createElement("header", null, header),
                React.createElement(Main, null, children),
                React.createElement("footer", null, footer)))));
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
    width: '920px',
    '@mobile': {
        width: '100%',
        '& p, ul, li': {
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
