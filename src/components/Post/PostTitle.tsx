import React from 'react';
import { Link } from 'gatsby';
import { BlogPost } from '../../types';

import {
  postTitleWrapperStyle,
  postTitleHeadingStyle,
  postTitleDescriptionStyle,
  postTitleTagsStyle,
} from './PostTitle.css';

type Props = Pick<BlogPost['frontmatter'], 'title' | 'description' | 'tags' | 'date'>;

function PostTitle({ title, description, tags }: Props) {
  return (
    <section className={postTitleWrapperStyle}>
      <h1 className={postTitleHeadingStyle} aria-label={`포스트 제목`}>
        {title}
      </h1>
      <div className={postTitleDescriptionStyle} aria-label={`포스트 부제목`}>
        {description}
      </div>
      <div>
        {(tags ?? []).map((tag) => (
          <Link
            className={postTitleTagsStyle}
            aria-label={`태그${tag}`}
            key={tag}
            to={`/tags/?tag=${tag}`}
          >
            #{tag}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PostTitle;
