import React from 'react';
import { Link } from 'gatsby';
import { BlogPost } from '../../types';
import { listItemStyle, listItemTitleStyle, listItemDescriptionStyle } from './PostLink.css';

interface Props {
  id: string;
  slug: string;
  frontmatter: BlogPost['frontmatter'];
}

// TODO: Lang값도 같이 받아야함
function PostLink({ id, slug, frontmatter }: Props) {
  const { title, date, description } = frontmatter;

  return (
    <li className={listItemStyle}>
      <Link to={`/posts/${slug}`} key={id}>
        <span className={listItemTitleStyle}>{title}</span>
        <span className={listItemDescriptionStyle}>
          {date} - {description}
        </span>
      </Link>
    </li>
  );
}

export default PostLink;
