import React from 'react';
import '../styles/task.css';

type TaskProps = {
  name: string;
};

const Task = ({ name }: TaskProps): JSX.Element => <div className="task">{name}</div>;
export default Task;
