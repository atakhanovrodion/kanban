import { useState } from 'react';

import HeaderMenu from './HeaderMenu';
import MemberIcon from './MemberIcon';
import Wrapper from './Wrapper';

import '../styles/app_header.css';

import icon from '../images/menu_icon.svg';

type AppHeaderProps = {
	user: string;
	changeCurrentBoard: (boardName: string) => void;
	appStateHandler: (state: string) => void;
};

const AppHeader = ({
	user,
	changeCurrentBoard,
	appStateHandler,
}: AppHeaderProps): JSX.Element => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const menuStateHandler = () => {
		setMenuOpen((prevState) => !prevState);
	};

	const menuElement = isMenuOpen && (
		<Wrapper stateHandler={menuStateHandler} className="wrapper">
			<HeaderMenu
				changeCurrentBoard={changeCurrentBoard}
				appStateHandler={appStateHandler}
			/>
		</Wrapper>
	);
	return (
		<header className="app_header">
			<button className="menu_button" type="button" onClick={menuStateHandler}>
				<img src={icon} alt="kekw" width="20px" height="20px" />
				<span>Boards</span>
			</button>
			{menuElement}
			<span className="header_title">KANBAN</span>
			<button className="user_settings_button" type="button">
				<MemberIcon name={user} />
			</button>
		</header>
	);
};

export default AppHeader;
