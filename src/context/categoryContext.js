import React, { createContext, useState } from 'react';
import { parse } from 'query-string';
export const categoryContext = createContext({
    category: 'all',
    setCategory: () => {
        return;
    },
});
export const CategoryContextProvider = ({ children }) => {
    const parsed = typeof window !== 'undefined' ? parse(location.search) : {};
    const [category, setCategoryRaw] = useState(parsed.category ?? 'all');
    const setCategory = (category) => {
        setCategoryRaw(category);
        window.history.pushState({ category }, '', `${window.location.pathname}?category=${category}`);
    };
    return (React.createElement(categoryContext.Provider, { value: {
            category,
            setCategory,
        } }, children));
};
