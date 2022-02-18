import { useSelector } from 'react-redux';

import { selectBoardName, selectMembers } from '../reducers/board';

import '../styles/board_header.css';
import MemberIcon from './MemberIcon';
import PlusIcon from './PlusIcon';
import FilterIcon from './FilterIcon';
import BoardHeaderAdd from './BoardHeaderAdd';
import BoardHeaderRename from './BoardHeaderRename';
import Wrapper from './Wrapper';
import BoardHeaderMenu from './BoardHeadermenu';

import { useState } from 'react';

const BoardHeader = (): JSX.Element => {
	const boardName = useSelector(selectBoardName);
	const memberList = useSelector(selectMembers);

	const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

	const addMenuHandler = () => {
		setIsAddMenuOpen((prevState) => !prevState);
	};

	const members = memberList.map((member) => (
		<li key={member}>
			<MemberIcon name={member} />
		</li>
	));

	const menuElement = isAddMenuOpen && (
		<Wrapper stateHandler={addMenuHandler} className="wrapper">
			<BoardHeaderAdd />
		</Wrapper>
	);

	return (
		<div className="board_header">
			<BoardHeaderRename />
			<ul className="member_list">
				{members}
				<li>
					<PlusIcon handler={addMenuHandler} />
				</li>
			</ul>
			<FilterIcon />
			<BoardHeaderMenu />
			{menuElement}
		</div>
	);
};

export default BoardHeader;
