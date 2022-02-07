import { useEffect, useState } from 'react';

import { useSelector, useDispatch, useStore } from 'react-redux';
import { selectAppState, getBoards, getUser } from '../reducers/appReducer';
import store from '../store';

import AppHeader from './AppHeader';
import Board from './Board';
import Login from './Login';
import Wrapper from './Wrapper';

import { IBoard, setBoard } from '../api';
import CreateNewBoard from './CreateNewBoard';
import '../styles/app.css';

const App = (): JSX.Element => {
	const [token, setToken] = useState('');
	const [boardsId, getBoardsId] = useState<any[]>([]);
	const appState = useSelector(selectAppState);

	const dispatch = useDispatch();
	useEffect(() => {
		try {
			store.dispatch(getUser());
		} catch (err) {
			console.log(err);
		}
	}, []);

	const tokenHandler = (value: string) => {
		setToken(value);
	};

	// eslint-disable-next-line

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
