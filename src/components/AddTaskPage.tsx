import React, { useState, MouseEvent, FormEvent, useEffect } from 'react';
import TaskToolBar from './TaskToolBar';
import ColorMenu from './ColorMenu';
import '../styles/add_task_page.css';

type AddTaskPageProps = {
  showAddTaskWindow: () => void;
  addTask: (
    name: string,
    color: string,
    members?: string[],
    labels?: string[],
    description?: ''
  ) => void;
};

const AddTaskPage = ({ showAddTaskWindow, addTask }: AddTaskPageProps): JSX.Element => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('white');
  const classBase = 'add_task_page';
  const [className, setClassName] = useState(`${classBase} white`);

  useEffect(() => {
    setClassName(`${classBase} ${color}`);
  }, [color]);

  const selectColor = (colorName: string) => {
    setColor(colorName);
  };

  const onclick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    addTask(text, color);

    setText('');
    showAddTaskWindow();
  };

  const onChange = (event: FormEvent<HTMLInputElement>): void => {
    setText(event.currentTarget.value);
  };
  return (
    <div className={className}>
      <form>
        <input onChange={onChange} type="text" value={text} />
        <ColorMenu selectColor={selectColor} />
        <TaskToolBar />
        <button type="submit" onClick={onclick}>
          add task
        </button>
      </form>
    </div>
  );
};

export default AddTaskPage;
