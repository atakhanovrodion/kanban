import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAppState, getUser } from '../reducers/appReducer';

import store from '../store';

import AppHeader from './AppHeader';
import Board from './Board';
import Login from './Login';
import Wrapper from './Wrapper';
import CreateNewBoard from './CreateNewBoard';
import '../styles/app.css';

const App = (): JSX.Element => {
	const appState = useSelector(selectAppState);
	useEffect(() => {
		try {
			store.dispatch(getUser());
		} catch (err) {
			console.log(err);
		}
	}, []);

	const loginElement = appState === 'unlogged' && (
		<Wrapper className="wrapper_dark">
			<Login />
		</Wrapper>
	);
	const CreateNewBoardElement = appState === 'creating' && (
		<Wrapper className="wrapper_dark">
			<CreateNewBoard />
		</Wrapper>
	);
	return (
		<div className="app">
			{loginElement}
			{CreateNewBoardElement}
			<AppHeader />
			<Board />
		</div>
	);
};
export default App;
