import React from 'react';
import { Link } from 'gatsby';
import { styled } from '../../../styles/stitches';
import Utterances from './Utterance';
function ByLine({ postSlugs, currentSlug, title }) {
    const currentSlugIndex = postSlugs.indexOf(currentSlug);
    const prevSlugIndex = currentSlugIndex - 1;
    const postSlugIndex = currentSlugIndex + 1;
    const randomSlugIndex = Math.floor(Math.random() * postSlugs.length);
    return (React.createElement("div", null,
        React.createElement(StyledLine, null),
        React.createElement(PersonalSection, null,
            React.createElement("div", null, "Written by \uAE40\uB9E5\uC2A4"),
            React.createElement(SocialMediaSection, null,
                React.createElement(Link, { to: "https://twitter.com/max_kim_dev" }, "twitter"),
                React.createElement(Link, { to: "https://github.com/MaxKim-J" }, "github"),
                React.createElement(Link, { to: "https://www.linkedin.com/in/%EC%A2%85%ED%98%81-%EA%B9%80-903967177/" }, "linkedin"))),
        React.createElement(SharedSection, null,
            React.createElement("div", { onClick: () => {
                    if (window) {
                        window.open(`https://twitter.com/intent/tweet?text=${title}&url=https://maxkim-j.github.io/posts/${currentSlug}`, '_blank');
                    }
                } }, "\uD2B8\uC704\uD130\uC5D0 \uACF5\uC720\uD558\uAE30"),
            React.createElement("div", { onClick: async () => {
                    await navigator.clipboard.writeText(window.location.href);
                    alert('지금 보고 계시는 포스트의 URL이 클립보드에 복사되었습니다.');
                } }, "\uB9C1\uD06C \uBCF5\uC0AC\uD558\uAE30")),
        React.createElement(NavSection, null,
            React.createElement(Link, { to: "/" }, "\uAE00 \uBAA9\uB85D\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30"),
            React.createElement(NavLinkSection, null,
                prevSlugIndex >= 0 && React.createElement(Link, { to: `/posts/${postSlugs[prevSlugIndex]}` }, "\uC774\uC804\uAE00"),
                postSlugIndex < postSlugs.length && (React.createElement(Link, { to: `/posts/${postSlugs[postSlugIndex]}` }, "\uB2E4\uC74C\uAE00")),
                React.createElement(Link, { to: `/posts/${postSlugs[randomSlugIndex]}` }, "\uB79C\uB364"))),
        React.createElement(Utterances, null)));
}
const StyledLine = styled('div', {
    width: '100%',
    backgroundColor: '$black',
    height: '1px',
    margin: '50px 0',
});
const PersonalSection = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '$description',
});
const SocialMediaSection = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    '& a': {
        marginLeft: '20px',
        hoverUnderline: 'true',
    },
});
const SharedSection = styled('div', {
    marginTop: '20px',
    display: 'flex',
    fontSize: '$description',
    '& div': {
        marginRight: '18px',
        hoverUnderline: 'true',
        cursor: 'pointer',
    },
});
const NavSection = styled('div', {
    margin: '20px 0 60px 0',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '$description',
    '& a': {
        hoverUnderline: 'true',
    },
});
const NavLinkSection = styled('div', {
    '& a': {
        marginLeft: '20px',
    },
});
export default ByLine;
