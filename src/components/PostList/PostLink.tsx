import React from 'react';
import { Link } from 'gatsby';
import { BlogPost, Lang } from '../../types';
import {
  listItemStyle,
  listItemTitleStyle,
  listItemCategoryStyle,
  listItemDateStyle,
  listItemWrapperStyle,
} from './PostLink.css';

interface Props {
  id: string;
  frontmatter: BlogPost['frontmatter'];
  lang: Lang;
}

// TODO: Lang값도 같이 받아야함
function PostLink({ id, frontmatter, lang }: Props) {
  const { title, date, slug, category } = frontmatter;

  return (
    <li className={listItemStyle}>
      <Link to={lang === 'ko' ? `/posts/${slug}` : `/${lang}/posts/${slug}`} key={id}>
        <div className={listItemWrapperStyle}>
          <div className={listItemDateStyle}>{date}</div>
          <div className={listItemTitleStyle}>{title}</div>
          <div className={listItemCategoryStyle}>{category}</div>
        </div>
      </Link>
    </li>
  );
}

export default PostLink;
