import React, { useEffect, useState } from 'react';
import '../styles/task_tool_bar.css';
import membersIcon from '../images/members.svg';
import labelsIcon from '../images/labels.svg';
import descriptionIcon from '../images/description.svg';
import AddMemberWindow from './AddMemberWindow';
import Wrapper from './Wrapper';

type TaskToolBarProps = {
  members: string[];
  windowStateHandler: (state: string) => void;
  addMembers: (value: string[]) => void;
  membersChecked: string[];
};

const TaskToolBar = ({
  members,
  windowStateHandler,
  addMembers,
  membersChecked,
}: TaskToolBarProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenHandler = () => {
    setIsOpen((prevState) => !prevState);
  };
  const onClick = () => {
    isOpenHandler();
  };

  const addMemeberElement = isOpen && (
    <Wrapper stateHandler={isOpenHandler} className="wrapper">
      <AddMemberWindow
        members={members}
        windowStateHandler={windowStateHandler}
        addMembers={addMembers}
        membersChecked={membersChecked}
      />
    </Wrapper>
  );
  return (
    <div className="task_tool_bar">
      <button
        type="button"
        className="members_button task_tool_bar_button"
        onClick={onClick}
      >
        <img src={membersIcon} alt="kekw" width="32" height="32" /> Members
      </button>
      <button type="button" className=" task_tool_bar_button">
        <img src={labelsIcon} alt="kekw" width="32" height="32" />
        Labels
      </button>
      <button type="button" className=" task_tool_bar_button">
        <img src={descriptionIcon} alt="kekw" width="32" height="32" />
        Description
      </button>
      {addMemeberElement}
    </div>
  );
};

export default TaskToolBar;
