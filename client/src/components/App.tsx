import React, { useEffect, useState } from 'react';

import AppHeader from './AppHeader';
import Board from './Board';
import Login from './Login';
import Wrapper from './Wrapper';

import { getBoards, IBoard, setBoard, getBoard } from '../api';
import CreateNewBoard from './CreateNewBoard';
import '../styles/app.css';

const App = (): JSX.Element => {
	const [user, setUser] = useState('');
	const [token, setToken] = useState('');
	const [boardsId, getBoardsId] = useState<any[]>([]);

	const [appState, setAppState] = useState('unlogged');

	const [boards, setBoards] = useState<string[]>([]);
	const [currentBoard, setCurrentBoard] = useState<IBoard>({
		name: '',
		members: [''],
		headers: [''],
		tasks: [[]],
	});

	const userHandler = (userName: string) => {
		setUser(userName);
	};

	const appStateHandler = (state: string) => {
		setAppState(state);
	};
	const tokenHandler = (value: string) => {
		setToken(value);
	};

	// eslint-disable-next-line
	const boardHandler = async (boardId: any, token: string) => {
		console.log('boardHandler');
		try {
			console.log(token);
			const res = await getBoard(boardId, token);
			console.log(res);
			setCurrentBoard(res);
			appStateHandler('logged');
		} catch (err) {
			console.log(err);
		}
	};

	const loginElement = appState === 'unlogged' && (
		<Wrapper className="wrapper_dark">
			<Login
				userHandler={userHandler}
				tokenHandler={tokenHandler}
				boardHandler={boardHandler}
				stateHandler={appStateHandler}
			/>
		</Wrapper>
	);
	const CreateNewBoardElement = appState === 'creating' && (
		<Wrapper className="wrapper_dark">
			<CreateNewBoard
				appStateHandler={appStateHandler}
				token={token}
				boardHandler={boardHandler}
			/>
		</Wrapper>
	);
	return (
		<div className="app">
			{loginElement}
			{CreateNewBoardElement}
			<AppHeader
				user={user}
				changeCurrentBoard={boardHandler}
				appStateHandler={appStateHandler}
			/>
			<Board
				memberList={currentBoard.members}
				currentBoard={currentBoard.name}
				data={currentBoard.tasks}
				headers={currentBoard.headers}
				appState={appState}
			/>
		</div>
	);
};
export default App;
