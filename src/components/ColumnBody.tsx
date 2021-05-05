import React from 'react';
import Task from './Task';
import '../styles/columnBody.css';
type ColumnBodyProps = {
  tasks: { name: string }[];
};

const ColumnBody = ({ tasks }: ColumnBodyProps): JSX.Element => {
  const tasksElement = tasks.map((item) => {
    return <Task name={item.name} />;
  });
  return <div className="columnBody">{tasksElement}</div>;
};
export default ColumnBody;
