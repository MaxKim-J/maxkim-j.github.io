import React, { createContext, useState } from 'react';
import { parse } from 'query-string';

type Category = 'all' | 'tech' | 'essay' | 'story';

export interface CategoryContextState {
  category: Category;
  setCategory: (theme: Category) => void;
}

export const categoryContext = createContext<CategoryContextState>({
  category: 'tech',
  setCategory: () => {
    return;
  },
});

export const CategoryContextProvider = ({ children }: { children: ReactChildren }) => {
  const parsed = parse(location.search);
  const [category, setCategoryRaw] = useState<Category>(parsed.category ?? 'tech');

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
