import React, { ReactChild, useState, useRef, useEffect } from 'react';
import { styled } from '../../styles/stitches';

interface Props {
  tooltip: ReactChild;
  children: ReactChild;
  trigger?: 'hover' | 'click';
}

function Tooltip({ children, tooltip }: Props) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <TooltipWrapper
      onClick={() => {
        setIsTooltipOpen((s) => !s);
      }}
      ref={tooltipWrapperRef}
    >
      <div>{children}</div>
      {isTooltipOpen ? <TooltipContent>{tooltip}</TooltipContent> : null}
    </TooltipWrapper>
  );
}

const TooltipWrapper = styled('div', {
  position: 'relative',
  cursor: 'pointer',
});

const TooltipContent = styled('div', {
  margin: 0,
  top: '30px',
  minWidth: '100px',
  padding: '3px',
  position: 'absolute',
  border: '1px solid $black',
});

export default Tooltip;
