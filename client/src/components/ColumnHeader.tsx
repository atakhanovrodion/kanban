import '../styles/column_header.css';
import PlusIcon from './PlusIcon';

type ColumnHeaderProps = {
	columnName: string;
};

const ColumnHeader = ({ columnName }: ColumnHeaderProps): JSX.Element => (
	<div className="column_header">
		<div className="decoy"> </div>
		<span className="collumn_name">{columnName}</span>
		<button type="button" className="add_task_button" onClick={() => {}}>
			<PlusIcon />
		</button>
	</div>
);
export default ColumnHeader;
