import React from 'react';
import CreateNewBoard from './CreateNewBoard';
import '../styles/header_menu.css';

type HeaderMenuProps = {
  boards: string[];

  changeCurrentBoard: (boardName: string) => void;

  appStateHandler: (state: string) => void;
};

const HeaderMenu = ({
  boards,
  changeCurrentBoard,
  appStateHandler,
}: HeaderMenuProps): JSX.Element => {
  const itemList = boards.map((item) => (
    <li key={item}>
      <button
        className="menu_board_button"
        type="button"
        key={item}
        onClick={() => {
          changeCurrentBoard(item);
        }}
      >
        {item}
      </button>
    </li>
  ));

  return (
    <>
      <ul className="header_menu">
        {itemList}
        <button className="menu_create_button" type="button">
          <span> create new</span>
        </button>
      </ul>
    </>
  );
};

export default HeaderMenu;
