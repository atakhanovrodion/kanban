import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Wrapper from './Wrapper';

import {
	getBoards,
	selectBoards,
	setCurrentBoard,
	setAppState,
} from '../reducers/appReducer';

import store from '../store';
import icon from '../images/menu_icon.svg';

import '../styles/header_menu.css';

const HeaderMenu = (): JSX.Element => {
	const [text, setText] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const stateHanler = () => {
		setIsOpen((prevState) => !prevState);
	};
	useEffect(() => {
		if (isOpen) store.dispatch(getBoards());
	}, [isOpen]);

	const boards: { _id: string; boardName: string }[] =
		useSelector(selectBoards);
	const filteredBoards = boards.filter((item) => item.boardName.includes(text));

	const itemList = filteredBoards.map((board) => (
		<li key={board._id}>
			<button
				className="menu_board_button"
				type="button"
				onClick={() => {
					store.dispatch(setCurrentBoard(board._id));
					stateHanler();
				}}
			>
				{board.boardName}
			</button>
		</li>
	));
	const headerMenuEl = (
		<Wrapper stateHandler={stateHanler} className="wrapper">
			<div className="header_menu">
				<input
					type="text"
					value={text}
					onChange={(e: BaseSyntheticEvent) => {
						setText(e.target.value);
					}}
				/>
				<ul>
					{itemList}
					<button
						className="menu_create_button"
						type="button"
						onClick={() => {
							store.dispatch(setAppState('creating'));
						}}
					>
						<span> create new</span>
					</button>
				</ul>
			</div>
		</Wrapper>
	);

	return (
		<>
			<button className="menu_button" type="button" onClick={stateHanler}>
				<img src={icon} alt="kekw" width="20px" height="20px" />
				<span>Boards</span>
			</button>
			{isOpen && headerMenuEl}
		</>
	);
};

export default HeaderMenu;
