import { useSelector } from 'react-redux';

import {
	selectBoardName,
	selectHeaders,
	selectMembers,
} from '../reducers/board';

import '../styles/board_header.css';
import MemberIcon from './MemberIcon';
import icon from '../images/menu_icon_dark.svg';
import PlusIcon from './PlusIcon';
import FilterIcon from './FilterIcon';
import BoardHeaderAdd from './BoardHeaderAdd';
import Wrapper from './Wrapper';
import { useState } from 'react';

type BoardHeaderProps = {
	filterOnUser: (user: string) => void;

	filter: string[];
};

const BoardHeader = ({
	filterOnUser,
	filter,
}: BoardHeaderProps): JSX.Element => {
	const boardName = useSelector(selectBoardName);
	const memberList = useSelector(selectMembers);

	const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

	const addMenuHandler = () => {
		setIsAddMenuOpen((prevState) => !prevState);
	};

	const members = memberList.map((member) => (
		<li key={member}>
			<MemberIcon name={member} filterOnUser={filterOnUser} filter={filter} />
		</li>
	));

	const menuElement = isAddMenuOpen && (
		<Wrapper stateHandler={addMenuHandler} className="wrapper">
			<BoardHeaderAdd />
		</Wrapper>
	);

	return (
		<div className="board_header">
			<span className="board_title">{boardName}</span>

			<ul className="member_list">
				{members}
				<li>
					<PlusIcon handler={addMenuHandler} />
				</li>
			</ul>
			<FilterIcon filter={filter} />
			<button className="board_header_button" type="button">
				<img src={icon} alt="kekw" width="20px" height="20px" />
				Menu
			</button>
			{menuElement}
		</div>
	);
};

export default BoardHeader;
