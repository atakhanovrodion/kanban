import React from 'react';
import TaskToolBar from './TaskToolBar';
import TaskCheckBox from './TaskCheckBox';
import '../styles/addTaskWindow.css';

type AddTaskWindowProps = {
  showAddTaskWindow: () => void;
  addTask: (name: string) => void;
};

const AddTaskWindow = ({
  showAddTaskWindow,
  addTask,
}: AddTaskWindowProps): JSX.Element => {
  const [text, setText] = React.useState('');
  const [color, setColor] = React.useState('white');

  const onclick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    addTask(text);
    setText('');
    showAddTaskWindow();
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setText(event.currentTarget.value);
  };

  return (
    <div className="addTaskWindow">
      <form>
        <input onChange={onChange} type="text" value={text} />
        <TaskCheckBox />
        <TaskToolBar />
        <button type="submit" onClick={onclick}>
          add task
        </button>
      </form>
    </div>
  );
};

export default AddTaskWindow;
