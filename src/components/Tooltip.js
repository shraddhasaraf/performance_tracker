import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import './Tooltip.css';

const Tooltip = ({ children, content, position = 'auto' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [calculatedPosition, setCalculatedPosition] = useState(position);
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

  const calculateOptimalPosition = useCallback(() => {
    if (!containerRef.current || !tooltipRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Calculate available space in each direction
    const spaceAbove = container.top;
    const spaceBelow = viewport.height - container.bottom;
    const spaceLeft = container.left;
    const spaceRight = viewport.width - container.right;

    // If position is not auto, check if it fits, otherwise find best position
    if (position !== 'auto') {
      const fits = checkPositionFits(position, container, tooltip, viewport);
      if (fits) {
        setCalculatedPosition(position);
        return;
      }
    }

    // Auto-calculate best position based on available space
    let bestPosition = 'top';
    let maxSpace = spaceAbove;

    if (spaceBelow > maxSpace) {
      bestPosition = 'bottom';
      maxSpace = spaceBelow;
    }
    if (spaceLeft > maxSpace && spaceLeft > 200) {
      bestPosition = 'left';
      maxSpace = spaceLeft;
    }
    if (spaceRight > maxSpace && spaceRight > 200) {
      bestPosition = 'right';
    }

    setCalculatedPosition(bestPosition);
  }, [position]);

  const checkPositionFits = (pos, container, tooltip, viewport) => {
    const tooltipHeight = 100; // Estimated tooltip height
    const tooltipWidth = 250; // Max tooltip width
    const margin = 10;

    switch (pos) {
      case 'top':
        return container.top > tooltipHeight + margin;
      case 'bottom':
        return viewport.height - container.bottom > tooltipHeight + margin;
      case 'left':
        return container.left > tooltipWidth + margin;
      case 'right':
        return viewport.width - container.right > tooltipWidth + margin;
      default:
        return true;
    }
  };

  useLayoutEffect(() => {
    if (isVisible) {
      // Small delay to ensure tooltip is rendered before calculating position
      const timer = setTimeout(calculateOptimalPosition, 10);
      return () => clearTimeout(timer);
    }
  }, [isVisible, content, calculateOptimalPosition]);

  return (
    <div 
      ref={containerRef}
      className="tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          ref={tooltipRef}
          className={`tooltip-content tooltip-${calculatedPosition}`}
        >
          {content}
          <div className={`tooltip-arrow tooltip-arrow-${calculatedPosition}`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
