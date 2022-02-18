import { useState, BaseSyntheticEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAppState, selectCurrentBoard } from '../reducers/appReducer';
import {
	selectHeaders,
	getBoard,
	selectTasks,
	setTasks,
} from '../reducers/board';

import Column from './Column';
import AddTaskPage from './AddTaskPage';
import Wrapper from './Wrapper';
import BoardHeader from './BoardHeader';

import EditTaskPage from './EditTaskPage';

import store from '../store';
import '../styles/board.css';

const Board = (): JSX.Element => {
	const appState = useSelector(selectAppState);
	const headers = useSelector(selectHeaders);
	const currentBoard = useSelector(selectCurrentBoard);
	const tasks = useSelector(selectTasks);
	const [windowState, setWindowState] = useState('');
	useEffect(() => {
		if (appState === 'logged') {
			store.dispatch(getBoard(currentBoard));
		}
	}, [appState]);
	useEffect(() => {
		if (currentBoard) {
			store.dispatch(getBoard(currentBoard));
			const socket = new WebSocket(`ws://localhost:3000/board/${currentBoard}`);
			socket.onmessage = (evt) => {
				console.log(JSON.parse(evt.data));
				store.dispatch(setTasks(JSON.parse(evt.data)));
			};
			return () => {
				socket.close();
			};
		}
	}, [currentBoard]);

	const showAddTaskWindow = (columnName: string) => {
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

	const columnsElement = headers.map((item, id) => (
		<li key={id} className="columnContainer">
			<Column
				columnName={item}
				tasks={tasks.filter((task) => task.header === item)}
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
			<BoardHeader />
			<div className="columns_container">
				<ul>{columnsElement}</ul>
			</div>
			{taskWrapper}
		</div>
	);
};

export default Board;
