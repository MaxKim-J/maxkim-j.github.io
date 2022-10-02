import React, { useState } from 'react';
import { styled, css } from '../../../styles/stitches';

type Category = 'tech' | 'tech-essay' | 'essay' | 'fiction';

const categories = [
  {
    id: 1,
    name: 'all',
    value: 25,
  },
  {
    id: 2,
    name: 'tech',
    value: 75,
  },
  {
    id: 3,
    name: 'essay',
    value: 125,
  },
  {
    id: 4,
    name: 'story',
    value: 175,
  },
];

// interface Props {}

function CategoryRangeInput() {
  // Location에 따라 초기 상태값이 달라짐
  const [rangeValue, setRangeValue] = useState(50);

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
          console.log(e.target.value);
          setRangeValue(e.target.value);
        }}
      />
      {categories.map((category) => (
        <MarkerWrapper key={category.id}>
          <StyledMarkerDescription index={category.id}>{category.name}</StyledMarkerDescription>
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

const StyledRangeInput = styled('input', {});

const MarkerWrapper = styled('div', {
  width: '59px',
});

const StyledMarkerDescription = styled('div', {
  fontSize: '$mobileDescription',
  position: 'absolute',
  variants: {
    index: {
      1: {
        left: 3,
      },
      2: {
        left: 59,
      },
      3: {
        left: 118,
      },
      4: {
        left: 180,
      },
    },
  },
});

export default CategoryRangeInput;
