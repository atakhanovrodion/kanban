import { BaseSyntheticEvent, useState } from 'react';
import { login, register } from '../api';
import '../styles/login.css';
import LoginView from './LoginView';

type LoginProps = {
	stateHandler: (state: string) => void;
	userHandler: (user: string) => void;
	tokenHandler: (value: string) => void;
	boardHandler: (boardId: string, token: string) => void;
};

const Login = ({
	stateHandler,
	userHandler,
	tokenHandler,
	boardHandler,
}: LoginProps): JSX.Element => {
	const [isLogin, setIsLogin] = useState(true);
	const switchView = () => {
		setIsLogin((prevState) => !prevState);
	};
	const sendRequest = async (userName: string, password: string) => {
		try {
			if (isLogin) {
				const res = await login(userName, password);

				tokenHandler(res.data.token);
				userHandler(res.data.userName);
				if (res.data.boards.length !== 0) {
					boardHandler(res.data.boards[0], res.data.token);
					stateHandler('logged');
				} else {
					stateHandler('creating');
				}
			} else {
				const res = await register(userName, password);

				tokenHandler(res.data.token);
				userHandler(res.data.userName);
				stateHandler('creating');
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="login">
			<LoginView handler={sendRequest} state={isLogin} />
			<span className="login_bottom">
				{isLogin ? 'Doenst have an account?' : 'Have an account?'}{' '}
				<span className="login_bottom_ref" onClick={switchView}>
					{isLogin ? 'Register now.' : 'Log in.'}
				</span>
			</span>
		</div>
	);
};

export default Login;
