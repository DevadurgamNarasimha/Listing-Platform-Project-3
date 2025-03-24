import React, { useState, useEffect } from 'react';

const PriceRangeSlider = ({ min = 0, max = 1000000, value, onChange }) => {
  const [minVal, setMinVal] = useState(value?.min || min);
  const [maxVal, setMaxVal] = useState(value?.max || max);
  
  // Keep local component state in sync with parent state
  useEffect(() => {
    if (value) {
      setMinVal(value.min);
      setMaxVal(value.max);
    }
  }, [value]);

  // Calculate slider track fill width for visual feedback
  const getPercent = (value) => {
    return Math.round(((value - min) / (max - min)) * 100);
  };

  // Set min and max values when they change
  const handleMinChange = (e) => {
    const value = Math.min(+e.target.value, maxVal - 1);
    setMinVal(value);
    onChange({ min: value, max: maxVal });
  };

  const handleMaxChange = (e) => {
    const value = Math.max(+e.target.value, minVal + 1);
    setMaxVal(value);
    onChange({ min: minVal, max: value });
  };

  return (
    <div className="relative h-7 w-full">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full">
        {/* Active track filler */}
        <div
          className="absolute h-full bg-blue-500 rounded-full"
          style={{
            left: `${getPercent(minVal)}%`,
            width: `${getPercent(maxVal) - getPercent(minVal)}%`
          }}
        />
      </div>

      {/* Minimum value thumb */}
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={handleMinChange}
        className="absolute w-full h-7 appearance-none pointer-events-none bg-transparent z-10"
        style={{
          // Custom thumb styling
          WebkitAppearance: 'none',
          '&::-webkit-slider-thumb': {
            WebkitAppearance: 'none',
            height: '16px',
            width: '16px',
            backgroundColor: 'white',
            borderRadius: '50%',
            border: '2px solid #3b82f6',
            pointerEvents: 'all',
            cursor: 'pointer',
            zIndex: 30
          },
          '&::-moz-range-thumb': {
            WebkitAppearance: 'none',
            height: '16px',
            width: '16px',
            backgroundColor: 'white',
            borderRadius: '50%',
            border: '2px solid #3b82f6',
            pointerEvents: 'all',
            cursor: 'pointer',
            zIndex: 30
          }
        }}
      />

      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={handleMaxChange}
        className="absolute w-full h-7 appearance-none pointer-events-none bg-transparent z-20"
        style={{
          WebkitAppearance: 'none',
          '&::-webkit-slider-thumb': {
            WebkitAppearance: 'none',
            height: '16px',
            width: '16px',
            backgroundColor: 'white',
            borderRadius: '50%',
            border: '2px solid #3b82f6',
            pointerEvents: 'all',
            cursor: 'pointer',
            zIndex: 30
          },
          '&::-moz-range-thumb': {
            WebkitAppearance: 'none',
            height: '16px',
            width: '16px',
            backgroundColor: 'white',
            borderRadius: '50%',
            border: '2px solid #3b82f6',
            pointerEvents: 'all',
            cursor: 'pointer',
            zIndex: 30
          }
        }}
      />

      <div 
        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-500 shadow-md z-30 cursor-pointer"
        style={{
          left: `calc(${getPercent(minVal)}% - 8px)`,
          touchAction: 'none'
        }}
      />
      <div 
        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-500 shadow-md z-30 cursor-pointer"
        style={{
          left: `calc(${getPercent(maxVal)}% - 8px)`,
          touchAction: 'none'
        }}
      />
    </div>
  );
};

export default PriceRangeSlider; 