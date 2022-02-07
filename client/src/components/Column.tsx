import ColumnHeader from './ColumnHeader';
import ColumnBody from './ColumnBody';
import { ITask } from '../api';

type ColumnProps = {
	columnName: string;
	tasks: ITask[];
	showAddTaskWindow: (columnName: string) => void;
	showEditTaskWindow: (columnName: string, id: string) => void;
	onTaskDrag: (target: string, column: string) => void;
	currentTask: string;
	//	moveTask: (newColumn: string, id: string) => void;
	deleteTask: (id: string) => void;
	currentTaskColorHandler: (value: string) => void;
	filter: string[];
};

const Column = ({
	columnName,
	tasks,
	showAddTaskWindow,
	showEditTaskWindow,
	onTaskDrag,
	currentTask,
	//	moveTask,
	deleteTask,
	currentTaskColorHandler,
	filter,
}: ColumnProps): JSX.Element => (
	<>
		<ColumnHeader
			columnName={columnName}
			showAddTaskWindow={showAddTaskWindow}
		/>
		<ColumnBody
			tasks={tasks}
			columnName={columnName}
			onTaskDrag={onTaskDrag}
			currentTask={currentTask}
			//	moveTask={moveTask}
			showEditTaskWindow={showEditTaskWindow}
			deleteTask={deleteTask}
			currentTaskColorHandler={currentTaskColorHandler}
			filter={filter}
		/>
	</>
);
export default Column;
