import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectBoardName, updateBoard } from '../reducers/board';

import Wrapper from './Wrapper';
import store from '../store';

const BoardHeaderRename = () => {
	const [text, setText] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const boardName = useSelector(selectBoardName);
	useEffect(() => {
		if (isOpen) {
			setText(boardName);
		}
	}, [isOpen]);
	const stateHandler = () => {
		setIsOpen((prevState) => !prevState);
	};
	const renameWindowEl = (
		<Wrapper className="wrapper" stateHandler={stateHandler}>
			<div>
				<input
					type="text"
					value={text}
					onChange={(e: BaseSyntheticEvent) => {
						setText(e.target.value);
					}}
				/>
				<button
					onClick={() => {
						stateHandler();
						store.dispatch(updateBoard({ boardName: text }));
					}}
				>
					change
				</button>
			</div>
		</Wrapper>
	);

	return (
		<>
			<span onClick={stateHandler} className="board_title">
				{useSelector(selectBoardName)}
			</span>
			{isOpen && renameWindowEl}
		</>
	);
};

export default BoardHeaderRename;
