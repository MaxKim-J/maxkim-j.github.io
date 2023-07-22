import React, { useState, useRef } from 'react';
import { styled } from '../../styles/stitches';
function Tooltip({ children, tooltip }) {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const tooltipWrapperRef = useRef(null);
    return (React.createElement(TooltipWrapper, { onClick: () => {
            setIsTooltipOpen((s) => !s);
        }, ref: tooltipWrapperRef },
        React.createElement("div", null, children),
        isTooltipOpen ? (React.createElement(TooltipContent, { onClick: (e) => {
                e.stopPropagation();
            } }, tooltip)) : null));
}
const TooltipWrapper = styled('div', {
    position: 'relative',
    cursor: 'pointer',
});
const TooltipContent = styled('div', {
    margin: 0,
    top: '30px',
    padding: '3px',
    position: 'absolute',
});
export default Tooltip;
