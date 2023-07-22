import React from 'react';
import { styled } from '../../../styles/stitches';
import { Link } from 'gatsby';
function PostTitle({ title, description, tags }) {
    return (React.createElement(PostTitleWrapper, null,
        React.createElement(PostTitleHeading, null, title),
        React.createElement(PostTitleDescription, null, description),
        React.createElement(PostTitleTagWrapper, null, (tags ?? []).map((tag) => (React.createElement(PostTitleTag, { key: tag, to: `/tags/?tag=${tag}` },
            "#",
            tag))))));
}
const PostTitleHeading = styled('h1', {
    margin: '28px 0',
});
const PostTitleWrapper = styled('div', {
    marginBottom: '60px',
});
const PostTitleDescription = styled('div', {
    fontSize: '$body2',
    marginBottom: '6px',
});
const PostTitleTagWrapper = styled('div', {
    fontSize: '$description',
});
const PostTitleTag = styled(Link, {
    fontSize: '$description',
    marginRight: '12px',
    textDecoration: 'underline',
});
export default PostTitle;
