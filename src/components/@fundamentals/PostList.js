import React from 'react';
import { Link } from 'gatsby';
import { styled } from '../../styles/stitches';
function PostLink({ id, slug, title, date, description }) {
    return (React.createElement(Link, { to: `/posts/${slug}`, key: id },
        React.createElement(ListItem, null,
            React.createElement(ListItemTitle, null, title),
            React.createElement(ListItemDescription, null,
                date,
                " - ",
                description))));
}
const ListItemTitle = styled('span', {
    fontSize: '$subTitle',
    fontWeight: '$bold',
    '@mobile': {
        fontSize: '$mobileTitle',
    },
});
const ListItem = styled('li', {
    marginBottom: '48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    lineHeight: 1.2,
    '@mobile': {
        alignItems: 'flex-start',
    },
});
const ListItemDescription = styled('span', {
    fontSize: '$description',
    marginTop: '6px',
    '@mobile': {
        fontSize: '$mobileDescription',
    },
});
export default PostLink;
