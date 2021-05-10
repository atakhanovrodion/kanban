/* eslint-disable */

import React, { useState } from 'react';

type ColorMenuProps = {
  selectColor: (nameColor: string) => void;
};

const ColorMenu = ({ selectColor }: ColorMenuProps): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const colorMenu = isOpen && (
    <ul>
      <li>
        <div
          onClick={() => {
            selectColor('white');
          }}
        >
          white
        </div>
      </li>
      <li>
        <div
          onClick={() => {
            selectColor('blue');
          }}
        >
          blue
        </div>
      </li>
      <li>
        <div
          onClick={() => {
            selectColor('yellow');
          }}
        >
          yellow
        </div>
      </li>
    </ul>
  );
  const onButtonColorClick = () => {
    setOpen(!isOpen);
  };
  return (
    <div className="color_menu">
      <div>
        <button type="button" onClick={onButtonColorClick}>
          Choce color
        </button>
      </div>
      {colorMenu}
    </div>
  );
};

export default ColorMenu;
