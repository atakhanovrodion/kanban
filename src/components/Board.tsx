import React, { useState, useEffect } from 'react';
import Column from './Column';
import simpleHash from '../helper';
import { getHeaders, getTasks, ITask } from '../api';
import AddTaskPage from './AddTaskPage';
import TaskWrapper from './TaskWrapper';
import BoardHeader from './BoardHeader';

const Board = (): JSX.Element => {
  const [headers, setHeaders] = useState(['']);
  const [tasks, setTasks] = useState([
    [{ id: '', name: '', color: '', members: [''], labels: [''], description: '' }],
    [],
    [],
    [],
  ]);
  const [isWindowOpen, setWindowOpen] = useState(false);
  const [currentColumn, setCurrentColumn] = useState('BackLog');

  useEffect(() => {
    setTasks(getTasks);
    setHeaders(getHeaders);
  }, []);

  const addTask = (
    name: string,
    color: string,
    members = [''],
    labels = [''],
    description = ''
  ): void => {
    const newArray = [...tasks];
    const id = `${name}+${color}`;
    newArray[simpleHash(currentColumn)].push({
      id,
      name,
      color,
      members,
      labels,
      description,
    });
    console.log(newArray);
    setTasks(newArray);
  };
  // HUITA
  const showAddTaskWindow = (columnName?: string) => {
    if (columnName) {
      setCurrentColumn(columnName);
    }
    setWindowOpen(!isWindowOpen);
  };
  const columnsElement = headers.map((item) => (
    <li key={item} className="columnContainer">
      <Column
        columnName={item}
        tasks={tasks[simpleHash(item)]}
        showAddTaskWindow={showAddTaskWindow}
      />
    </li>
  ));
  const openWindow = (...args: any) => {
    console.log(args);
  };
  const taskWrapper = isWindowOpen && (
    <TaskWrapper>
      <AddTaskPage showAddTaskWindow={showAddTaskWindow} addTask={addTask} />
    </TaskWrapper>
  );
  return (
    <div className="board">
      <BoardHeader boardName="myboard" memberList={['admin']} />
      <div className="columnsContainer">
        <ul>{columnsElement}</ul>
      </div>
      {taskWrapper}
    </div>
  );
};

export default Board;
