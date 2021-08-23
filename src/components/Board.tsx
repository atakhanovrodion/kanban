import React, { useState, useEffect, SyntheticEvent, BaseSyntheticEvent } from 'react';

import Column from './Column';
import simpleHash from '../helper';
import AddTaskPage from './AddTaskPage';
import Wrapper from './Wrapper';
import BoardHeader from './BoardHeader';

import { getHeaders, setBoard, ITask } from '../api';
import EditTaskPage from './EditTaskPage';

import '../styles/board.css';

type BoadrdProps = {
  boardId: number;
  memberList: string[];
  currentBoard: string;
  data: ITask[][];
};

const Board = ({ boardId, memberList, currentBoard, data }: BoadrdProps): JSX.Element => {
  const [headers, setHeaders] = useState(['']);
  const [tasks, setTasks] = useState<ITask[][]>([[], [], [], []]);
  const [filter, setFilter] = useState(['']);
  const [currentColumn, setCurrentColumn] = useState('BackLog');
  const [count, setCount] = useState(0);
  const [windowState, setWindowState] = useState('');
  useEffect(() => {
    console.log(data);
    setHeaders(getHeaders);
  }, []);
  useEffect(() => {
    if (data[0][0]) {
      setCount(1);
      console.log(data);
      setTasks(data);
    }
  }, [data]);
  useEffect(() => {
    setCount((prevState) => {
      let tmp = prevState;
      tmp += 1;
      return tmp;
    });
    if (count >= 2) {
      setBoard(boardId, {
        id: boardId,
        name: currentBoard,
        headers,
        members: memberList,
        tasks,
      });
    }
  }, [tasks]);

  const addTask = (
    { name, color, members = ['admin'], labels = [''], description = '' }: ITask,
    column = currentColumn
  ): void => {
    if (name === '') return;
    const newArray = tasks.map((task) => [...task]);
    const id = `${name}+${color}`;
    newArray[simpleHash(column)].push({
      id,
      name,
      color,
      members,
      labels,
      description,
    });
    setTasks(newArray);
  };

  const deleteItem = (id: string, array: ITask[][]): void => {
    const ind = array[simpleHash(currentColumn)].findIndex((el) => el.id === id);
    array[simpleHash(currentColumn)].splice(ind, 1);
  };

  const deleteTask = (id: string): void => {
    const newArray = tasks.map((task) => [...task]);
    deleteItem(id, newArray);
    setTasks(newArray);
  };

  const moveTask = (newColumn: string, id: string): void => {
    if (newColumn === currentColumn) {
      return;
    }
    const newArray = tasks.map((task) => [...task]);
    const newTask = tasks[simpleHash(currentColumn)].filter((el) => el.id === id);
    deleteItem(id, newArray);
    newArray[simpleHash(newColumn)].push(newTask[0]);
    setTasks(newArray);
  };

  const showAddTaskWindow = (columnName: string) => {
    setCurrentColumn(columnName);

    setWindowState('AddTaskPage');
  };

  const wrapperHandler = (event: BaseSyntheticEvent) => {
    if (windowState === 'TaskToolBar') return;

    if (event.target)
      if (windowState === 'AddTaskPage' && event.target.className === 'wrapper_dark') {
        setWindowState('');
      }
    if (
      windowState === 'TaskToolBar' &&
      (event.target.className === '' || event.target.className === 'wrapper_dark')
    ) {
      setWindowState('AddTaskPage');
    }
    if (windowState === 'EditTaskPage' && event.target.className === 'wrapper_dark') {
      setWindowState('');
    }
  };

  const windowStateHandler = (state: string) => {
    setWindowState(state);
  };

  const showEditTaskWindow = (columnName: string, id: string) => {
    if (windowState) {
      setWindowState('');
    } else setWindowState('EditTaskPage');
  };

  const filterOnUser = (user: string): void => {
    setFilter([user]);
  };

  //--------------------------
  const [currentTask, setCurrentTask] = useState('');
  const [currentTaskColor, setCurrentTaskColor] = useState('');
  const currentTaskColorHandler = (value: string) => {
    setCurrentTaskColor(value);
  };

  const onTaskDrag = (target: string, column: string) => {
    setCurrentColumn(column);
    setCurrentTask(target);
  };

  const columnsElement = headers.map((item) => (
    <li key={item} className="columnContainer">
      <Column
        columnName={item}
        tasks={tasks[simpleHash(item)]}
        showAddTaskWindow={showAddTaskWindow}
        showEditTaskWindow={showEditTaskWindow}
        onTaskDrag={onTaskDrag}
        currentTask={currentTask}
        moveTask={moveTask}
        deleteTask={deleteTask}
        currentTaskColorHandler={currentTaskColorHandler}
        filter={filter}
      />
    </li>
  ));

  const taskWrapper = windowState && (
    <Wrapper stateHandler={wrapperHandler} className="wrapper_dark">
      {windowState === 'AddTaskPage' || windowState === 'TaskToolBar' ? (
        <AddTaskPage
          addTask={addTask}
          members={memberList}
          windowStateHandler={windowStateHandler}
        />
      ) : (
        <EditTaskPage color={currentTaskColor} />
      )}
    </Wrapper>
  );

  return (
    <div className="board">
      <BoardHeader
        boardName={currentBoard}
        memberList={memberList}
        filterOnUser={filterOnUser}
        filter={filter}
      />
      <div className="columns_container">
        <ul>{columnsElement}</ul>
      </div>

      {taskWrapper}
    </div>
  );
};

export default Board;
