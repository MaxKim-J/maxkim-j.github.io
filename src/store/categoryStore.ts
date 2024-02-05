import { create } from 'zustand';
import { PostCategory } from '../types';
import { parse } from 'query-string';

export const CATEGORY_LIST: PostCategory[] = ['all', 'tech', 'essay', 'review'];

const isPostCategory = (category: any): category is PostCategory =>
  CATEGORY_LIST.includes(category);

const getCategory = () => {
  const pathParams = typeof window !== 'undefined' ? parse(location.search) : {};
  const category = pathParams.category;
  const result = Array.isArray(category) ? category[0] : category;

  return isPostCategory(result) ? result : null;
};

interface CategoryStore {
  category: PostCategory;
  setCategory: (theme: PostCategory) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  category: getCategory() ?? 'all',
  setCategory: (category: PostCategory) => {
    set(() => ({ category }));
  },
}));
