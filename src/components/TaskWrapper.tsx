import React from 'react';

import '../styles/task_wrapper.css';

type AddTaskWrapperProps = {
  children: JSX.Element;
};

const AddTaskWrapper = ({ children }: AddTaskWrapperProps): JSX.Element => (
  <div className="task_wrapper">{children}</div>
);

export default AddTaskWrapper;
