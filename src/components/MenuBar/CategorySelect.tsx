import React from 'react';
import { labelStyle, selectStyle } from './CategorySelect.css';
import { CATEGORY_LIST, useCategoryStore } from '../../store/categoryStore';
import { useTranslation } from 'react-i18next';

function CategorySelect() {
  const { category, setCategory } = useCategoryStore((state) => state);
  const { t } = useTranslation();

  return (
    <>
      <label className={labelStyle} htmlFor="category">
        category
      </label>
      <select
        className={selectStyle}
        id="category"
        aria-label={t(`카테고리를 선택하면 아래 포스트 목록을 카테고리에 따라 보실 수 있어요`)}
        name="category"
        value={category}
        onChange={(e) => {
          const value = e.target.value as unknown as any;
          setCategory(value);
        }}
      >
        {CATEGORY_LIST.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
}

export default CategorySelect;
