import { useSelector } from 'react-redux';
import { selectUserName, selectNotifications } from '../reducers/appReducer';

import HeaderMenu from './HeaderMenu';
import MemberIcon from './MemberIcon';

import HeaderNotifications from './HeaderNotifications';

import '../styles/app_header.css';

const AppHeader = (): JSX.Element => {
	const userName = useSelector(selectUserName);

	return (
		<header className="app_header">
			<HeaderMenu />
			<HeaderNotifications />
			<span className="header_title">KANBAN</span>

			<div className="user_settings_button">
				<MemberIcon name={userName} type="user_settings" active={true} />
			</div>
		</header>
	);
};

export default AppHeader;
