import React, { ReactChild, useState, useRef, useContext } from 'react';
import { themeContext } from '../../context/themeContext';
import { styled } from '../../styles/stitches';

interface Props {
  tooltip: ReactChild;
  children: ReactChild;
  trigger?: 'hover' | 'click';
}

function Tooltip({ children, tooltip }: Props) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipWrapperRef = useRef<HTMLDivElement>(null);

  const { theme } = useContext(themeContext);

  return (
    <TooltipWrapper
      onClick={() => {
        setIsTooltipOpen((s) => !s);
      }}
      ref={tooltipWrapperRef}
    >
      <div>{children}</div>
      {isTooltipOpen ? (
        <TooltipContent
          borderColor={theme === 'dark' ? 'white' : 'black'}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {tooltip}
        </TooltipContent>
      ) : null}
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
  variants: {
    borderColor: {
      white: {
        border: '1px solid $white',
      },
      black: {
        border: '1px solid $black',
      },
    },
  },
});

export default Tooltip;
