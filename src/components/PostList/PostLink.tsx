import React from 'react';
import { Link } from 'gatsby';
import { BlogPost, Lang } from '../../types';
import { listItemStyle, listItemTitleStyle, listItemDescriptionStyle } from './PostLink.css';

interface Props {
  id: string;
  slug: string;
  frontmatter: BlogPost['frontmatter'];
  lang: Lang;
}

// TODO: Lang값도 같이 받아야함
function PostLink({ id, frontmatter, lang }: Props) {
  const { title, date, description, slug } = frontmatter;

  return (
    <li className={listItemStyle}>
      <Link to={lang === 'ko' ? `/posts/${slug}` : `/${lang}/posts/${slug}`} key={id}>
        <span className={listItemTitleStyle}>{title}</span>
        <span className={listItemDescriptionStyle}>
          {date} - {description}
        </span>
      </Link>
    </li>
  );
}

export default PostLink;
