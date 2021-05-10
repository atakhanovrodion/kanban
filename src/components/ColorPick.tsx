import React from 'react';

const ColorPick = (): JSX.Element => (
  <li>
    <div className="choiceColorIcon">
      <svg width="32px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" />
      </svg>
    </div>
    <span>red</span>
  </li>
);
export default ColorPick;
