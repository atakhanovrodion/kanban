import React from 'react';
import '../styles/task.css';

type TaskProps = {
  name: string;
  color: string;
};

const Task = ({ name, color }: TaskProps): JSX.Element => (
  <div className={`task ${color}`}> {name}</div>
);
export default Task;
