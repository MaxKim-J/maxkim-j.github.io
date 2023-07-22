import { Link } from 'gatsby';
import React from 'react';
import { styled } from '../../../styles/stitches';
import Tooltip from '../../@fundamentals/Tooltip';
import ThemeTooltip from './ThemeTooltip';
function Header() {
    return (React.createElement(HeaderWrapper, null,
        React.createElement(LeftSide, null,
            React.createElement(Link, { to: "/" },
                React.createElement(Title, null, "\uAE40\uB9E5\uC2A4 \uBE14\uB85C\uADF8"))),
        React.createElement(RightSide, null,
            React.createElement(Tooltip, { tooltip: React.createElement(ThemeTooltip, null) },
                React.createElement("div", null, "theme")),
            React.createElement("div", null,
                React.createElement(Link, { to: "/pic" }, "pic")),
            React.createElement("div", null,
                React.createElement(Link, { to: "/about" }, "about")),
            React.createElement("div", null,
                React.createElement(Link, { to: "/rss.xml" }, "rss")))));
}
const LeftSide = styled('div', {});
const RightSide = styled('div', {
    display: 'flex',
    alignItems: 'center',
    '& >div': {
        marginLeft: '15px',
    },
    '@mobile': {
        fontSize: '12px'
    },
});
const HeaderWrapper = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '82px',
});
const Title = styled('div', {
    fontSize: '$mainTitle',
    fontWeight: '$bold',
    '@mobile': {
        fontSize: '$subTitle',
    },
});
export default Header;
