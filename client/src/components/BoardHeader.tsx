import React from 'react';
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
	const members = memberList.map((member) => (
		<li key={member}>
			<MemberIcon name={member} filterOnUser={filterOnUser} filter={filter} />
		</li>
	));
	return (
		<div className="board_header">
			<span className="board_title">{boardName}</span>

			<ul className="member_list">
				{members}
				<li>
					<PlusIcon />
				</li>
			</ul>
			<FilterIcon filter={filter} />
			<button className="board_header_button" type="button">
				<img src={icon} alt="kekw" width="20px" height="20px" />
				Menu
			</button>
		</div>
	);
};

export default BoardHeader;
