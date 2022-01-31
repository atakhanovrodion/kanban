import { useState, BaseSyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectAppState } from '../reducers/appReducer';
import { selectBoardName, selectHeaders } from '../reducers/board';

import Column from './Column';
import simpleHash from '../helper';
import AddTaskPage from './AddTaskPage';
import Wrapper from './Wrapper';
import BoardHeader from './BoardHeader';

import { setBoard, ITask } from '../api';
import EditTaskPage from './EditTaskPage';

import '../styles/board.css';

type BoadrdProps = {
	memberList: string[];
	currentBoard: string;
	data: ITask[];
	appState: string;
	headers: string[];
};

const Board = (): JSX.Element => {
	const appState = useSelector(selectAppState);
	const headers = useSelector(selectHeaders);

	const [tasks, setTasks] = useState<ITask[][]>([[], [], [], []]);
	const [filter, setFilter] = useState(['']);
	const [currentColumn, setCurrentColumn] = useState('BackLog');
	const [count, setCount] = useState(0);
	const [windowState, setWindowState] = useState('');
	const getTasks = () => {
		if (appState === 'logged') {
			console.log('loading');
		}
	};

	const addTask = (
		{
			name,
			color,
			members = ['admin'],
			labels = [''],
			description = '',
		}: ITask,
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
			<BoardHeader filterOnUser={filterOnUser} filter={filter} />
			<div className="columns_container">
				<ul>{columnsElement}</ul>
			</div>

			{taskWrapper}
		</div>
	);
};

export default Board;
