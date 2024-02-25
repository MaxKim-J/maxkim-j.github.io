import React from 'react';

import { type BlogPosts } from '../../types';
import PostLink from './PostLink';

import { orderedListStyle } from './PostList.css';
import { useCategoryStore } from '../../store/categoryStore';
import { useTranslation } from 'react-i18next';
import { useLangStore } from '../../store/langStore';

interface Props {
  postList: BlogPosts;
}

function PostList({ postList }: Props) {
  const { t } = useTranslation();
  const category = useCategoryStore((state) => state.category);
  const currentLang = useLangStore((state) => state.lang);

  const refinedPostList = postList.filter(({ frontmatter }) => {
    if (category === 'all') {
      return frontmatter.category !== null;
    }
    return frontmatter.category === category;
  });

  return (
    <ol className={orderedListStyle} aria-label={t(`포스트 목록`)}>
      {refinedPostList.length ? (
        refinedPostList.map(({ id, frontmatter, slug }) => (
          <PostLink lang={currentLang} key={id} id={id} slug={slug} frontmatter={frontmatter} />
        ))
      ) : (
        <div>No post</div>
      )}
    </ol>
  );
}

export default PostList;
