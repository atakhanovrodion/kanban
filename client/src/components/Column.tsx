import ColumnHeader from './ColumnHeader';
import ColumnBody from './ColumnBody';
import { ITask } from '../api';

type ColumnProps = {
	columnName: string;
	tasks: ITask[];
};

const Column = ({ columnName, tasks }: ColumnProps): JSX.Element => (
	<>
		<ColumnHeader columnName={columnName} />
		<ColumnBody tasks={tasks} columnName={columnName} />
	</>
);
export default Column;
