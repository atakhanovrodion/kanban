import { useState, BaseSyntheticEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAppState, selectCurrentBoard } from '../reducers/appReducer';
import {
	selectBoardName,
	selectHeaders,
	getBoard,
	selectTasks,
	setTasks,
} from '../reducers/board';

import Column from './Column';
import simpleHash from '../helper';
import AddTaskPage from './AddTaskPage';
import Wrapper from './Wrapper';
import BoardHeader from './BoardHeader';

import { ITask } from '../api';
import EditTaskPage from './EditTaskPage';

import store from '../store';
import '../styles/board.css';

const Board = (): JSX.Element => {
	const appState = useSelector(selectAppState);
	const headers = useSelector(selectHeaders);
	const currentBoard = useSelector(selectCurrentBoard);
	const tasks = useSelector(selectTasks);
	const [filter, setFilter] = useState(['']);
	const [currentColumn, setCurrentColumn] = useState('BackLog');
	const [count, setCount] = useState(0);
	const [windowState, setWindowState] = useState('');
	useEffect(() => {
		if (appState === 'logged') {
			store.dispatch(getBoard(currentBoard));
		}
	}, [appState]);
	useEffect(() => {
		if (currentBoard) {
			const socket = new WebSocket(`ws://localhost:3000/board/${currentBoard}`);
			socket.onmessage = (evt) => {
				console.log(JSON.parse(evt.data));
				store.dispatch(setTasks(JSON.parse(evt.data)));
			};
		}
	}, [currentBoard]);

	const deleteItem = (id: string, array: ITask[][]): void => {
		const ind = array[simpleHash(currentColumn)].findIndex(
			(el) => el.id === id
		);
		array[simpleHash(currentColumn)].splice(ind, 1);
	};

	const deleteTask = (id: string): void => {
		const newArray = tasks.map((task) => [...task]);
		deleteItem(id, newArray);
		setTasks(newArray);
	};
	/*
	const moveTask = (newColumn: string, id: string): void => {
		if (newColumn === currentColumn) {
			return;
		}
		const newArray = tasks.map((task) => [...task]);
		const newTask = tasks[simpleHash(currentColumn)].filter(
			(el) => el.id === id
		);
		deleteItem(id, newArray);
		newArray[simpleHash(newColumn)].push(newTask[0]);
		setTasks(newArray);
	};
*/
	const showAddTaskWindow = (columnName: string) => {
		setCurrentColumn(columnName);

		setWindowState('AddTaskPage');
	};

	const wrapperHandler = (event: BaseSyntheticEvent) => {
		if (windowState === 'TaskToolBar') return;

		if (event.target)
			if (
				windowState === 'AddTaskPage' &&
				event.target.className === 'wrapper_dark'
			) {
				setWindowState('');
			}
		if (
			windowState === 'TaskToolBar' &&
			(event.target.className === '' ||
				event.target.className === 'wrapper_dark')
		) {
			setWindowState('AddTaskPage');
		}
		if (
			windowState === 'EditTaskPage' &&
			event.target.className === 'wrapper_dark'
		) {
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
	filter;
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

	const columnsElement = headers.map((item, id) => (
		<li key={id} className="columnContainer">
			<Column
				columnName={item}
				tasks={tasks.filter((task) => task.header === item)}
				showAddTaskWindow={showAddTaskWindow}
				showEditTaskWindow={showEditTaskWindow}
				onTaskDrag={onTaskDrag}
				currentTask={currentTask}
				//	moveTask={moveTask}
				deleteTask={deleteTask}
				currentTaskColorHandler={currentTaskColorHandler}
				filter={filter}
			/>
		</li>
	));

	const taskWrapper = windowState && (
		<Wrapper stateHandler={wrapperHandler} className="wrapper_dark">
			{windowState === 'AddTaskPage' || windowState === 'TaskToolBar' ? (
				<AddTaskPage windowStateHandler={windowStateHandler} />
			) : (
				<EditTaskPage color={currentTaskColor} />
			)}
		</Wrapper>
	);

	return (
		<div className="board">
			<BoardHeader filterOnUser={filterOnUser} filter={filter} />
			<div className="columns_container">
				<ul>{columnsElement}</ul>
			</div>
			{taskWrapper}
		</div>
	);
};

export default Board;
