import React, { useState, useContext } from 'react';
import { styled, css } from '../../../styles/stitches';
import { categoryContext } from '../../../context/categoryContext';

enum CategoryRange {
  'all' = 0,
  'tech' = 50,
  'essay' = 100,
  'review' = 150,
}

const categoryMap: { [key: string]: CategoryRange } = {
  '0': 'all',
  '50': 'tech',
  '100': 'essay',
  '150': 'review',
};

function CategoryRangeInput() {
  const { setCategory, category } = useContext(categoryContext);
  const [rangeValue, setRangeValue] = useState(CategoryRange[category]);

  return (
    <CategoryRangeInputWrapper>
      <StyledRangeInput
        className={rangeInputStyle()}
        type="range"
        min="0"
        max="150"
        step="50"
        value={rangeValue}
        onChange={(e) => {
          setRangeValue(e.target.value);
          setCategory(categoryMap[e.target.value]);
        }}
      />
      {Object.values(categoryMap).map((category, index) => (
        <MarkerWrapper key={category}>
          <StyledMarkerDescription index={index}>{category}</StyledMarkerDescription>
        </MarkerWrapper>
      ))}
    </CategoryRangeInputWrapper>
  );
}

const CategoryRangeInputWrapper = styled('div', {
  position: 'relative',
});

const rangeInputStyle = css({
  '-webkit-appearance': 'none',
  width: '200px',
  backgroundColor: 'black',
  height: '5px',
  outline: 'none',
  margin: 0,
  '&::-webkit-slider-thumb': {
    '-webkit-appearance': 'none',
    height: '16px',
    width: '16px',
    borderRadius: '50%',
    backgroundColor: 'black',
    cursor: 'pointer',
  },
});

const StyledRangeInput = styled('input', {
  cursor: 'pointer',
});

const MarkerWrapper = styled('div', {
  width: '59px',
});

const StyledMarkerDescription = styled('div', {
  fontSize: '$mobileDescription',
  position: 'absolute',
  variants: {
    index: {
      0: {
        left: 3,
      },
      1: {
        left: 59,
      },
      2: {
        left: 118,
      },
      3: {
        left: 174,
      },
    },
  },
});

export default CategoryRangeInput;
