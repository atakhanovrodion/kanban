import React from 'react';
import '../styles/boardHeader.css';

type BoardHeaderProps = {
  boardName: string;
  memberList: string[];
};

const BoardHeader = ({ boardName, memberList }: BoardHeaderProps): JSX.Element => (
  <div className="board_header">
    <span>{boardName}</span>
    <div>{memberList}</div>
    <div>INVITE_MEMBER</div>
    <div>MENU</div>
    <button type="button">MENU</button>
  </div>
);

export default BoardHeader;
