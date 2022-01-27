import React, { useState, MouseEvent, FormEvent, useEffect } from 'react';
import TaskToolBar from './TaskToolBar';
import ColorMenu from './ColorMenu';
import { ITask } from '../api';
import '../styles/add_task_page.css';
import MemberIcon from './MemberIcon';

type AddTaskPageProps = {
  addTask: ({ name, color }: ITask) => void;
  members: string[];
  windowStateHandler: (state: string) => void;
};

const AddTaskPage = ({
  addTask,
  members,
  windowStateHandler,
}: AddTaskPageProps): JSX.Element => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('yellow');
  const classBase = 'add_task_page';
  const [className, setClassName] = useState(`${classBase} yellow`);
  const [membersChecked, setMembersChecked] = useState<null | string[]>(null);

  const addMembers = (value: string[]): void => {
    setMembersChecked(value);
  };

  useEffect(() => {
    setClassName(`${classBase} ${color}`);
  }, [color]);

  const selectColor = (colorName: string) => {
    setColor(colorName);
  };

  const onclick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    addTask({ name: text, color, members: membersChecked });

    setText('');
  };

  const onChange = (event: FormEvent<HTMLInputElement>): void => {
    setText(event.currentTarget.value);
  };
  const memberListElement = membersChecked && membersChecked.length > 1 && (
    <div className="member_list_element">
      <span className="members_list_label">Members:</span>
      <div className="member_list_wrapper">
        {membersChecked.map((member) => (
          <MemberIcon name={member} />
        ))}
      </div>
    </div>
  );
  return (
    <div className={className}>
      <form>
        <input
          className="add_task_page_input"
          onChange={onChange}
          type="text"
          value={text}
          placeholder="Task name..."
        />
        <ColorMenu selectColor={selectColor} />
        <TaskToolBar
          members={members}
          windowStateHandler={windowStateHandler}
          addMembers={addMembers}
          membersChecked={membersChecked}
        />
        {memberListElement}
        <button className="add_task_page_submit" type="submit" onClick={onclick}>
          Add task
        </button>
      </form>
    </div>
  );
};

export default AddTaskPage;
