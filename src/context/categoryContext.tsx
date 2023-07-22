import React, { createContext, useState, ReactNode } from 'react';
import { parse } from 'query-string';

type Category = 'all' | 'tech' | 'essay' | 'review';

export interface CategoryContextState {
  category: Category;
  setCategory: (theme: Category) => void;
}

export const categoryContext = createContext<CategoryContextState>({
  category: 'all',
  setCategory: () => {
    return;
  },
});

export const CategoryContextProvider = ({ children }: { children: ReactNode }) => {
  const parsed = typeof window !== 'undefined' ? parse(location.search) : {};

  const [category, setCategoryRaw] = useState<Category>((parsed.category as Category) ?? 'all');

  const setCategory = (category: Category) => {
    setCategoryRaw(category);
    window.history.pushState({ category }, '', `${window.location.pathname}?category=${category}`);
  };

  return (
    <categoryContext.Provider
      value={{
        category,
        setCategory,
      }}
    >
      {children}
    </categoryContext.Provider>
  );
};
