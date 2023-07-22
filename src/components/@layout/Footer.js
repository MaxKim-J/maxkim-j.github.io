import React from 'react';
import { styled } from '../../styles/stitches';
function Footer() {
    return (React.createElement(FooterContent, null,
        React.createElement("div", null, "\uAE40\uB9E5\uC2A4 \uBE14\uB85C\uADF8\u24D2\uAE40\uC885\uD601, 2022"),
        React.createElement("div", null,
            "Powered By ",
            React.createElement("a", { href: "https://www.gatsbyjs.com/" }, "gatsby"),
            " /",
            React.createElement("a", { href: "" }, "gh-pages"))));
}
const FooterContent = styled('div', {
    marginTop: '32px',
    display: 'flex',
    height: '32px',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 0,
    zIndex: 10,
    '& div': {
        fontSize: '10px',
    },
    '& a': {
        textDecoration: 'underline',
        fontSize: '10px',
    },
    '@mobile': {
        fontSize: '$mobileDescription',
    },
});
export default Footer;
