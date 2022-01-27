import React, { SyntheticEvent } from 'react';

type ColorPickProps = {
  color: string;
  onClick: (val: string) => void;
  currentColor: string;
};

const ColorPick = ({ color, onClick, currentColor }: ColorPickProps): JSX.Element => {
  const className = `${color} ${currentColor === color && 'bold'}`;
  return (
    <li key={color}>
      <button
        type="button"
        className={className}
        onClick={(e: SyntheticEvent) => {
          e.preventDefault();
          onClick(color);
        }}
      >
        <svg viewBox="0 0 100 100" width="32" height="32">
          <circle cx="50" cy="50" r="50" />
        </svg>
        {color[0].toUpperCase() + color.slice(1)}
      </button>
    </li>
  );
};
export default ColorPick;
