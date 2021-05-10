import React from 'react';
import Task from './Task';
import '../styles/column_body.css';

type ColumnBodyProps = {
  tasks: { name: string; color: string }[];
};

const ColumnBody = ({ tasks }: ColumnBodyProps): JSX.Element => {
  const tasksElement = tasks.map((item) => <Task name={item.name} color={item.color} />);
  return <div className="column_body">{tasksElement}</div>;
};
export default ColumnBody;
