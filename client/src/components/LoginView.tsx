import { useState, BaseSyntheticEvent } from 'react';

type LoginViewProps = {
	handler: (userName: string, password: string) => void;
	state: boolean;
};

const LoginView = ({ handler, state }: LoginViewProps) => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const onSubmit = (e: BaseSyntheticEvent) => {
		e.preventDefault();
		handler(userName, password);
	};
	return (
		<form onSubmit={onSubmit}>
			<span className="login_text">{state ? 'Log In' : 'Registration'}</span>
			<input
				className="login_input"
				value={userName}
				type="text"
				onChange={(e: BaseSyntheticEvent) => {
					setUserName(e.target.value);
				}}
			/>

			<input
				className="login_input"
				value={password}
				type="password"
				onChange={(e: BaseSyntheticEvent) => {
					setPassword(e.target.value);
				}}
			/>
			<button className="login_button" type="submit">
				{state ? 'LogIn' : 'Sign up'}
			</button>
		</form>
	);
};

export default LoginView;
