import store from '../store';
import { sendTasks, setTasks } from '../reducers/board';
import Task from './Task';
import '../styles/column_body.css';
import { ITask } from '../api';

type ColumnBodyProps = {
	columnName: string;
	tasks: ITask[];
	showEditTaskWindow: (columnName: string, id: string) => void;
	onTaskDrag: (target: string, column: string) => void;
	currentTask: string;
	//	moveTask: (newColumn: string, id: string) => void;
	deleteTask: (id: string) => void;
	currentTaskColorHandler: (value: string) => void;

	filter: string[];
};

const ColumnBody = ({
	tasks,
	columnName,
	onTaskDrag,
	currentTask,
	//	moveTask,
	showEditTaskWindow,
	deleteTask,
	currentTaskColorHandler,
	filter,
}: ColumnBodyProps): JSX.Element => {
	const className = `column_body`;
	const tasksElement = tasks.map((item) => (
		<Task
			columnName={columnName}
			id={item._id}
			name={item.text}
			color={item.color}
			onTaskDrag={onTaskDrag}
			showEditTaskWindow={showEditTaskWindow}
			deleteTask={deleteTask}
			members={item.members}
			currentTaskColorHandler={currentTaskColorHandler}
			filter={filter}
		/>
	));

	return (
		<div
			onDragOver={(e) => {
				e.preventDefault();
			}}
			onDrop={(e) => {
				//	moveTask(columnName, currentTask);
				const prevState = store.getState().board.tasks;
				const ind = prevState.findIndex(
					(task) => task._id === store.getState().board.currentTask
				);
				if (ind >= 0) {
					const newTask = { ...prevState[ind], header: columnName };
					const state = [
						...prevState.slice(0, ind),
						newTask,
						...prevState.slice(ind + 1, prevState.length),
					];
					store.dispatch(sendTasks(state));
				}
				console.log('on drop');
			}}
			className={className}
		>
			{tasksElement}
		</div>
	);
};
export default ColumnBody;
