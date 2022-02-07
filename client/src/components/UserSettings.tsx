import '../styles/user_settings.css';
import { useDispatch } from 'react-redux';
import store from '../store';
import { logout } from '../reducers/appReducer';

type IconWindowProps = {
	offsetX: number;
	offsetY: number;
};

const UserSettings = ({ offsetX, offsetY }: IconWindowProps) => {
	const dispatch = useDispatch();
	return (
		<div
			style={{
				top: offsetY,
				right: window.innerWidth - offsetX - 60,
			}}
			className="user_settings"
		>
			<button
				onClick={() => {
					store.dispatch(logout());
				}}
			>
				logout
			</button>
		</div>
	);
};

export default UserSettings;
