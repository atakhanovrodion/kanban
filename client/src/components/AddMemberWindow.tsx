/* eslint-disable no-new-object */

import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import '../styles/add_member_window.css';
import MemberIcon from './MemberIcon';

type AddMemberWindowProps = {
  members: string[];
  windowStateHandler: (state: string) => void;
  addMembers: (value: string[]) => void;
  membersChecked: string[];
};

const AddMemberWindow = ({
  members,
  windowStateHandler,
  addMembers,
  membersChecked,
}: AddMemberWindowProps): JSX.Element => {
  const [membersList, setMembersList] = useState(() => {
    if (membersChecked) {
      return [...membersChecked];
    }
    return [''];
  });
  const [offset, setOffset] = useState([185, 460]);
  const membersListElement = members.map((member) => (
    <button
      className="add_member_window_checkbox"
      type="button"
      onClick={() => {
        if (membersList.includes(member)) {
          setMembersList((prevState) => {
            const ind = prevState.findIndex((el) => el === member);
            return [...prevState.slice(0, ind), ...prevState.slice(ind + 1)];
          });
        } else {
          setMembersList([...membersList, member]);
        }
      }}
    >
      <input checked={membersList.includes(member)} type="checkbox" />
      <MemberIcon name={member} active={false} />
      {member}
    </button>
  ));
  useEffect(() => {
    addMembers(membersList);
  }, [membersList]);

  return (
    <div
      className="add_member_window"
      draggable="true"
      style={{
        top: offset[0],
        left: offset[1],
      }}
      onDragEnd={(e: BaseSyntheticEvent) => {
        console.log(e);
        setOffset([e.pageY, e.pageX]);
      }}
    >
      <div className="add_member_window_title">
        <span>Members</span>
        <button
          className="add_member_window_close"
          type="button"
          onClick={() => {
            windowStateHandler('AddTaskPage');
          }}
        >
          x
        </button>
      </div>
      <input
        className="add_member_window_textarea"
        defaultValue="Search..."
        onFocus={(e) => {
          e.target.value = '';
        }}
      />
      <div>{membersListElement}</div>
    </div>
  );
};

export default AddMemberWindow;
