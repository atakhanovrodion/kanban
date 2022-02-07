import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserName } from '../reducers/appReducer';

import HeaderMenu from './HeaderMenu';
import MemberIcon from './MemberIcon';
import Wrapper from './Wrapper';

import '../styles/app_header.css';

import icon from '../images/menu_icon.svg';

const AppHeader = (): JSX.Element => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const menuStateHandler = () => {
		setMenuOpen((prevState) => !prevState);
	};

	const userName = useSelector(selectUserName);

	const menuElement = isMenuOpen && (
		<Wrapper stateHandler={menuStateHandler} className="wrapper">
			<HeaderMenu />
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
				<MemberIcon name={userName} type="user_settings" active={true} />
			</button>
		</header>
	);
};

export default AppHeader;
