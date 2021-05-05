import React from 'react';
import Column from './Column';
import simpleHash from '../helper';
import AddTaskWrapper from './AddTaskWrapper';
import '../styles/app.css';

const App = () => {
  const [columns, setCollection] = React.useState(['BackLog', 'ToDo', 'Doing', 'Done']);
  const [tasks, setTasks] = React.useState([
    [{ name: 'lulw' }, { name: '5head' }, { name: '2head' }],
    [{ name: 'nul' }],
    [],
    [{ name: 'kekw' }],
  ]);
  const [isWindowOpen, openWindow] = React.useState(false);
  const [currentColumn, setCurrentColumn] = React.useState('BackLog');
  const addTask = (name: string): void => {
    console.log(currentColumn, name);
  };
  // HUITA
  const showAddTaskWindow = (columnName?: string) => {
    if (columnName) {
      setCurrentColumn(columnName);
    }
    openWindow(!isWindowOpen);
  };
  const columnsElement = columns.map((item) => (
    <li key={item} className="columnContainer">
      <Column
        columnName={item}
        tasks={tasks[simpleHash(item)]}
        showAddTaskWindow={showAddTaskWindow}
      />
    </li>
  ));

  return (
    <>
      <div className="columnsContainer">
        <ul>{columnsElement}</ul>
      </div>
      {isWindowOpen && (
        <AddTaskWrapper showAddTaskWindow={showAddTaskWindow} addTask={addTask} />
      )}
    </>
  );
};

export default App;
