import React, { BaseSyntheticEvent, SyntheticEvent } from 'react';
import '../styles/task.css';
import MemberIcon from './MemberIcon';

type TaskProps = {
  columnName: string;
  id: string;
  name: string;
  color: string;
  onTaskDrag: any;
  showEditTaskWindow: any;
  members?: string[];

  filter: string[];

  currentTaskColorHandler: (value: string) => void;
};

const Task = ({
  columnName,
  id,
  name,
  color,
  onTaskDrag,
  showEditTaskWindow,
  members,
  currentTaskColorHandler,
  filter,
}: TaskProps): JSX.Element => {
  const testDrag = (event: SyntheticEvent) => {
    // event.target.style.visibility = 'hidden';
  };
  const membersElement = members?.map((el) => {
    if (el === '') return <> </>;
    return <MemberIcon name={el} onHeader={false} />;
  });
  if (filter[0] && !members?.includes(filter[0])) {
    return <> </>;
  }

  return (
    <button
      draggable="true"
      type="button"
      onClick={(e: BaseSyntheticEvent) => {
        if (e.target.className.includes('task')) {
          currentTaskColorHandler(color);
          showEditTaskWindow(columnName, id);
        }
      }}
      onDrag={testDrag}
      onDragStart={() => {
        onTaskDrag(id, columnName);
      }}
      onDragEnd={(e) => {
        e.target.style.visibility = 'visible';
      }}
      className={id !== 'pseudo' ? `task ${color}` : 'pseudo_task'}
    >
      <span className="task_text">{name} </span>
      <div className="task_icon_wrapper">{membersElement}</div>
    </button>
  );
};
export default Task;
