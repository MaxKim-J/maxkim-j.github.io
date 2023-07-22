import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { styled } from '../../../styles/stitches';
import { categoryContext } from '../../../context/categoryContext';
function PostList({ postList }) {
    const { category } = useContext(categoryContext);
    const refinedPostList = postList.filter(({ frontmatter }) => {
        if (category === 'all') {
            return frontmatter.category !== null;
        }
        return frontmatter.category === category;
    });
    return (React.createElement(ListItemRoot, null, refinedPostList.length ? (refinedPostList.map(({ id, frontmatter, slug }) => (React.createElement(Link, { to: `/posts/${slug}`, key: id },
        React.createElement("section", null,
            React.createElement(ListItem, null,
                React.createElement(ListItemTitle, null, frontmatter.title),
                React.createElement(ListItemDescription, null,
                    frontmatter.date,
                    " - ",
                    frontmatter.description))))))) : (React.createElement("div", null, "No post"))));
}
const ListItemRoot = styled('ol', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '@mobile': {
        alignItems: 'flex-start',
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
const ListItemTitle = styled('span', {
    fontSize: '$subTitle',
    fontWeight: '$bold',
    '@mobile': {
        fontSize: '$mobileTitle',
    },
});
const ListItemDescription = styled('span', {
    fontSize: '$description',
    marginTop: '6px',
    '@mobile': {
        fontSize: '12px',
    },
});
export default PostList;
