import React, { useState } from 'react';
import '../styles/app_header.css';
import logo from '../images/menu_icon.svg';

type AppHeaderProps = {
  user: string;
  boards: string[];
};

const AppHeader = ({ user, boards }: AppHeaderProps): JSX.Element => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const itemList = boards.map((item) => (
    <li>
      <button type="button" key={item}>
        {item}
      </button>
    </li>
  ));
  const menuElement = isMenuOpen && (
    <ul className="menu_list">
      {itemList}
      <button type="button">create new</button>
    </ul>
  );
  return (
    <header className="app_header">
      <div className="menu">
        <button
          className="menu_button"
          type="button"
          onClick={() => {
            setMenuOpen(!isMenuOpen);
          }}
        >
          <img src={logo} alt="kekw" width="40px" height="40px" />
        </button>
        <span>Boards</span>
      </div>
      {menuElement}

      <button className="user_settings_button" type="button">
        {user}
      </button>
    </header>
  );
};

export default AppHeader;
