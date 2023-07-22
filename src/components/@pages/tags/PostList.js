import React from 'react';
import { parse } from 'query-string';
import PostLink from '../../@fundamentals/PostList';
import { styled } from '../../../styles/stitches';
function PostList({ postList }) {
    const parsed = typeof window !== 'undefined' ? parse(location.search) : {};
    const tag = parsed.tag;
    return (React.createElement(ListItemRoot, null, postList
        .filter(({ frontmatter }) => (frontmatter.tags ?? []).includes(tag))
        .map(({ id, frontmatter, slug }) => (React.createElement(PostLink, { key: id, id: id, slug: slug, title: frontmatter.title, date: frontmatter.date, description: frontmatter.description })))));
}
const ListItemRoot = styled('ol', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '@mobile': {
        alignItems: 'flex-start',
    },
});
export default PostList;
