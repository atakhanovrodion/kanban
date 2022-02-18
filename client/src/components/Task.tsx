import { BaseSyntheticEvent, SyntheticEvent } from 'react';
import { setCurrentTask } from '../reducers/board';
import '../styles/task.css';
import MemberIcon from './MemberIcon';
import store from '../store';

type TaskProps = {
	columnName: string;
	id: string;
	name: string;
	color: string;
	members?: string[];
};

const Task = ({
	columnName,
	id,
	name,
	color,
	members,
}: TaskProps): JSX.Element => {
	const testDrag = (event: SyntheticEvent) => {
		// event.target.style.visibility = 'hidden';
	};
	const membersElement = members?.map((el) => {
		if (el === '') return <> </>;
		return <MemberIcon name={el} onHeader={false} />;
	});

	return (
		<div
			draggable="true"
			onDrag={testDrag}
			onDragStart={() => {
				console.log('start drag');
				store.dispatch(setCurrentTask(id));
			}}
			onDragEnd={(e: BaseSyntheticEvent) => {
				e.target.style.visibility = 'visible';
				store.dispatch(setCurrentTask(''));
				console.log('end drag');
			}}
			className={`task ${color}`}
		>
			<span className="task_text">{name} </span>
			<div className="task_icon_wrapper">{membersElement}</div>
		</div>
	);
};
export default Task;
