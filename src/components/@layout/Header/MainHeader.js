import React from 'react';
import { Link } from 'gatsby';
import { styled } from '../../../styles/stitches';
import Tooltip from '../../@fundamentals/Tooltip';
import ThemeTooltip from './ThemeTooltip';
import CategoryRangeInput from './CategoryRangeInput';
function MainHeader() {
    return (React.createElement(MainHeaderWrapper, null,
        React.createElement(TitleSection, null,
            React.createElement(Link, { to: "/" },
                React.createElement(TitleWrapper, null,
                    React.createElement("div", null, "\uAE40\uB9E5\uC2A4 \uBE14\uB85C\uADF8"))),
            React.createElement(SubTitleWrapper, null,
                React.createElement("div", null, "\uADF8\uB54C\uADF8\uB54C \uD544\uC694\uD55C \uC5D4\uC9C0\uB2C8\uC5B4\uB9C1"),
                React.createElement("div", null, "\uAE30\uB85D\uC774 \uD544\uC694\uD55C \uC0DD\uAC01\uACFC \uACBD\uD5D8\uB4E4"))),
        React.createElement(NavSection, null,
            React.createElement(LeftSide, null,
                React.createElement(Tooltip, { tooltip: React.createElement(ThemeTooltip, null) },
                    React.createElement("div", null, "theme")),
                React.createElement("div", null,
                    React.createElement(Link, { to: "/pic" }, "pic")),
                React.createElement("div", null,
                    React.createElement(Link, { to: "/about" }, "about")),
                React.createElement("div", null,
                    React.createElement(Link, { to: "/rss.xml" }, "rss"))),
            React.createElement(RightSide, null,
                React.createElement(CategoryNotice, null, "swipe \u2194"),
                React.createElement(CategoryRangeInput, null)))));
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
