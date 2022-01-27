/* eslint-disable */

import React, { SyntheticEvent, useState } from 'react';
import '../styles/color_menu.css';
import ColorPick from './ColorPick';

type ColorMenuProps = {
  selectColor: (nameColor: string) => void;
};

const ColorMenu = ({ selectColor }: ColorMenuProps): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const [currentColor, setCurentColor] = useState('yellow');
  const onClick = (val: string) => {
    selectColor(val);
    setCurentColor(val);
    setOpen(!isOpen);
  };
  const colorMenu = isOpen && (
    <ul className="color_list">
      <ColorPick color="yellow" onClick={onClick} currentColor={currentColor} />
      <ColorPick color="blue" onClick={onClick} currentColor={currentColor} />
      <ColorPick color="red" onClick={onClick} currentColor={currentColor} />
      <ColorPick color="green" onClick={onClick} currentColor={currentColor} />
    </ul>
  );
  const onButtonColorClick = () => {
    setOpen(!isOpen);
  };
  return (
    <div className="color_menu">
      <button
        className={`color_menu_button ${currentColor}`}
        type="button"
        onClick={onButtonColorClick}
      >
        <svg viewBox="0 0 100 100" width="32" height="32">
          <circle cx="50" cy="50" r="50" />
        </svg>
        <span className={`color_menu_button_text ${currentColor}`}>
          {currentColor[0].toUpperCase() + currentColor.slice(1)}
        </span>
      </button>
      {colorMenu}
    </div>
  );
};

export default ColorMenu;
