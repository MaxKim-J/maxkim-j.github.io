import React, { useState, useContext } from 'react';
import { categoryContext } from '../../context/categoryContext';
import { labelStyle, selectStyle } from './CategorySelect.css';

const categories = ['all', 'tech', 'essay', 'review'];

function CategorySelect() {
  const { setCategory, category } = useContext(categoryContext);
  const [categoryValue, setCategoryValue] = useState(category);

  return (
    <>
      <label className={labelStyle} htmlFor="category">
        category
      </label>
      <select
        className={selectStyle}
        id="category"
        aria-label="카테고리를 선택하면 아래 포스트 목록을 카테고리에 따라 보실 수 있어요"
        name="category"
        value={categoryValue}
        onChange={(e) => {
          const value = e.target.value as unknown as any;
          setCategoryValue(value);
          setCategory(value as any);
        }}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
}

export default CategorySelect;