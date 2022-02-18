import { useState } from 'react';

import icon from '../images/menu_icon_dark.svg';
import { removeBoard } from '../reducers/board';

import Wrapper from './Wrapper';
import store from '../store';

const BoardHeaderMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const stateHandler = () => {
		setIsOpen((prevState) => !prevState);
	};
	const renameWindowEl = (
		<Wrapper className="wrapper" stateHandler={stateHandler}>
			<button
				onClick={() => {
					store.dispatch(removeBoard());
					stateHandler();
				}}
			>
				delete
			</button>
		</Wrapper>
	);

	return (
		<>
			<button
				className="board_header_button"
				type="button"
				onClick={stateHandler}
			>
				<img src={icon} alt="kekw" width="20px" height="20px" />
				Menu
			</button>
			{isOpen && renameWindowEl}
		</>
	);
};

export default BoardHeaderMenu;
