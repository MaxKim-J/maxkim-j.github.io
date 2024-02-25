import React from 'react';
import { Link } from 'gatsby';
import { BlogPost } from '../../types';

import {
  postTitleWrapperStyle,
  postTitleHeadingStyle,
  postTitleDescriptionStyle,
  postTitleTagsStyle,
} from './PostTitle.css';
import { useLangStore } from '../../store/langStore';
import { useTranslation } from 'react-i18next';

type Props = Pick<BlogPost['frontmatter'], 'title' | 'description' | 'tags' | 'date'>;

function PostTitle({ title, description, tags }: Props) {
  const { t } = useTranslation();
  const currentLang = useLangStore((state) => state.lang);

  return (
    <section className={postTitleWrapperStyle}>
      <h1 className={postTitleHeadingStyle} aria-label={t(`포스트 제목`)}>
        {title}
      </h1>
      <div className={postTitleDescriptionStyle} aria-label={t(`포스트 부제목`)}>
        {description}
      </div>
      <div>
        {(tags ?? []).map((tag) => (
          <Link
            className={postTitleTagsStyle}
            aria-label={`tag: ${tag}`}
            key={tag}
            to={currentLang === 'ko' ? `/tags/?tag=${tag}` : `/${currentLang}/tags/?tag=${tag}`}
          >
            #{tag}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PostTitle;
