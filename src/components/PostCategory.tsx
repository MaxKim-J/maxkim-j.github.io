import React from 'react';
import { CATEGORY_LIST, useCategoryStore } from '../store/categoryStore';
import { BlogPosts, type PostCategory } from '../types';
import { useMemo } from 'react';
import {
  categoryChipsWrapperStyle,
  categoryChipsStyle,
  categoryChipsCountStyle,
} from './PostCategory.css';
interface Props {
  postList: BlogPosts;
}

export function PostCategories({ postList }: Props) {
  const curentCategory = useCategoryStore((state) => state.category);
  const setCategory = useCategoryStore((state) => state.setCategory);

  // TODO 페이지별 연산
  const postByCategoryCountMap = useMemo(() => {
    const map = {
      all: 0,
      tech: 0,
      essay: 0,
      culture: 0,
    };

    postList.forEach((post) => {
      const category = post.frontmatter.category as PostCategory;
      map[category] += 1;
      map['all'] += 1;
    });

    return map;
  }, [postList]);

  return (
    <div className={categoryChipsWrapperStyle}>
      {CATEGORY_LIST.map((category) => (
        <button
          className={categoryChipsStyle[curentCategory === category ? 'here' : 'default']}
          key={category}
          onClick={() => {
            setCategory(category);
          }}
        >
          <span>{category}</span>
          <span className={categoryChipsCountStyle}>({postByCategoryCountMap[category]})</span>
        </button>
      ))}
    </div>
  );
}
