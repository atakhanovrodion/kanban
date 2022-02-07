import { BaseSyntheticEvent, useState } from 'react';
import { login, register, getBoards } from '../reducers/appReducer';
import store from '../store';
import '../styles/login.css';
import LoginView from './LoginView';

const Login = (): JSX.Element => {
	const [isLogin, setIsLogin] = useState(true);
	const switchView = () => {
		setIsLogin((prevState) => !prevState);
	};
	const sendRequest = async (userName: string, password: string) => {
		try {
			if (isLogin) {
				store.dispatch(login(userName, password));
			} else {
				store.dispatch(register(userName, password));
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
