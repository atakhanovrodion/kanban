import React from 'react';
import AddTaskWindow from './AddTaskWindow';

import '../styles/addTaskWrapper.css';

type AddTaskWrapperProps = {
  showAddTaskWindow: () => void;
  addTask: (name: string) => void;
};

const AddTaskWrapper = ({
  showAddTaskWindow,
  addTask,
}: AddTaskWrapperProps): JSX.Element => (
  <div className="addTaskWrapper">
    <AddTaskWindow showAddTaskWindow={showAddTaskWindow} addTask={addTask} />
  </div>
);

export default AddTaskWrapper;
