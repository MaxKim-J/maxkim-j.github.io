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
export default function AboutPage({ data }) {
    globalStyle();
    postStyles();
    const { body } = data.mdx;
    return (React.createElement(MainLayout, { header: React.createElement(Header, null), footer: React.createElement(Footer, null) },
        React.createElement(StyledName, null, "\uAE40\uC885\uD601"),
        React.createElement(MDXRenderer, { css: StyledMdxRenderer() }, body),
        React.createElement(StyledLabelSection, null,
            React.createElement(StyledLabel, null,
                React.createElement(StyledLabelTitle, null, "Currently"),
                React.createElement(StyledLabelContent, null,
                    React.createElement("strong", null,
                        React.createElement(Link, { to: "https://flex.team" }, "flex.team")),
                    ' ',
                    "Product Engineer(FE)")),
            React.createElement(StyledLabel, null,
                React.createElement(StyledLabelTitle, null, "Find Me On"),
                React.createElement(StyledLabelContent, null,
                    React.createElement(Link, { to: "https://twitter.com/max_kim_dev" }, "twitter"),
                    React.createElement(Link, { to: "https://github.com/MaxKim-J" }, "github"),
                    React.createElement(Link, { to: "https://www.linkedin.com/in/%EC%A2%85%ED%98%81-%EA%B9%80-903967177/" }, "linkedin"),
                    React.createElement(Link, { to: "https://github.com/MaxKim-J/RESUME" }, "resume"))),
            React.createElement(StyledLabel, null,
                React.createElement(StyledLabelTitle, null, "Other Posts"),
                React.createElement(StyledLabelContent, null,
                    React.createElement(Link, { to: "https://univalli.com/news/search_result.html?search=%EA%B9%80%EC%A2%85%ED%98%81&page=1" }, "\uB300\uD559\uC5B8\uB860\uD611\uB3D9\uC870\uD569"),
                    React.createElement(Link, { to: "https://univ20.com/?s=%EA%B9%80%EC%A2%85%ED%98%81" }, "\uB300\uD559\uB0B4\uC77C"),
                    React.createElement(Link, { to: "https://brunch.co.kr/@hwaseen" }, "\uBE0C\uB7F0\uCE58"))),
            React.createElement(StyledLabel, null,
                React.createElement(StyledLabelTitle, null, "Contact"),
                React.createElement(StyledLabelContent, null,
                    React.createElement(Link, { to: "mailto:hwaseen@gmail.com" }, "hwaseen@gmail.com"))))));
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
export const query = graphql `
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
    return React.createElement(MetaHead, { title: "\uAE40\uB9E5\uC2A4 \uBE14\uB85C\uADF8 | about", description: "\uC548\uB155\uD558\uC138\uC694 \uAE40\uC885\uD601\uC785\uB2C8\uB2E4." });
};
