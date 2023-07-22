import React, { useState, useContext } from 'react';
import { styled } from '../../../styles/stitches';
import { categoryContext } from '../../../context/categoryContext';

const categories = ['all', 'tech', 'essay', 'review'];

function CategorySelect() {
  const { setCategory, category } = useContext(categoryContext);
  const [categoryValue, setCategoryValue] = useState(category);

  return (
    <StyledSelect
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
    </StyledSelect>
  );
}

const StyledSelect = styled('select', {
  cursor: 'pointer',
  fontSize: '14px',
});

export default CategorySelect;
