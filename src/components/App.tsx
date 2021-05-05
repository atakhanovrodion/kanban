import React from 'react';
import Column from './Column';
import simpleHash from '../helper';

import '../styles/app.css';
const App = () => {
  const [columns, setCollection] = React.useState([
    'BackLog',
    'ToDo',
    'Doing',
    'Done',
  ]);
  const [tasks, setTasks] = React.useState([
    [{ name: 'lulw' }, { name: '5head' }, { name: '2head' }],
    [],
    [],
    [{ name: 'kekw' }],
  ]);
  const [isWindowOpen, openWindow] = React.useState(false);
  const addTask = (columnName: string, name: string): void => {
    console.log(columnName, name);
  };
  const showAddTaskWindow = () => {
    openWindow(!isWindowOpen);
  };
  const columnsElement = columns.map((item) => {
    return (
      <li key={item} className="columnContainer">
        <Column
          columnName={item}
          tasks={tasks[simpleHash(item)]}
          showAddTaskWindow={showAddTaskWindow}
        />
      </li>
    );
  });

  return (
    <div className="columnsContainer">
      <ul>{columnsElement}</ul>
    </div>
  );
};

export default App;
