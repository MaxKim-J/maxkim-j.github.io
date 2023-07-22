import React, { useState, useContext } from 'react';
import { styled, css } from '../../../styles/stitches';
import { categoryContext } from '../../../context/categoryContext';
var CategoryRange;
(function (CategoryRange) {
    CategoryRange[CategoryRange["all"] = 0] = "all";
    CategoryRange[CategoryRange["tech"] = 50] = "tech";
    CategoryRange[CategoryRange["essay"] = 100] = "essay";
    CategoryRange[CategoryRange["review"] = 150] = "review";
})(CategoryRange || (CategoryRange = {}));
const categoryMap = {
    '0': 'all',
    '50': 'tech',
    '100': 'essay',
    '150': 'review',
};
function CategoryRangeInput() {
    const { setCategory, category } = useContext(categoryContext);
    const [rangeValue, setRangeValue] = useState(CategoryRange[category]);
    return (React.createElement(CategoryRangeInputWrapper, null,
        React.createElement(StyledRangeInput, { className: rangeInputStyle(), "aria-label": "\uC2AC\uB77C\uC774\uB4DC\uD558\uBA74 \uBE14\uB85C\uADF8 \uAE00 \uBAA9\uB85D \uCE74\uD14C\uACE0\uB9AC\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4.", type: "range", min: "0", max: "150", step: "50", value: rangeValue, onChange: (e) => {
                const value = e.target.value;
                setRangeValue(value);
                setCategory(categoryMap[value]);
            } }),
        Object.values(categoryMap).map((category, index) => (React.createElement(MarkerWrapper, { key: category },
            React.createElement(StyledMarkerDescription, { role: "button", index: index }, category))))));
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
                left: 178,
            },
        },
    },
});
export default CategoryRangeInput;
