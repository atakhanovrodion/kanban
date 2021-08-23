import React, { useEffect, useState } from 'react';

import AppHeader from './AppHeader';
import Board from './Board';
import Login from './Login';
import Wrapper from './Wrapper';

import { getBoards, IBoard } from '../api';
import CreateNewBoard from './CreateNewBoard';
import '../styles/app.css';

const App = (): JSX.Element => {
  const [user, setUser] = useState('');
  const [currentBoard, setCurrentBoard] = useState<IBoard>({
    id: 0,
    name: '',
    members: [''],
    headers: [''],
    tasks: [[]],
  });
  const [boards, setBoards] = useState<string[]>([]);
  const [appState, setAppState] = useState('unlogged');
  const userHandler = (userName: string) => {
    setUser(userName);
  };

  const changeCurrentBoard = async (boardName: string) => {
    const data = await getBoards(user);
    const ind = data.findIndex((el) => el.name === boardName);
    setCurrentBoard(data[ind]);
  };
  const appStateHandler = (state: string) => {
    setAppState(state);
  };

  useEffect(async () => {
    if (appState === 'logged') {
      if (await getBoards(user)) {
        const data = await getBoards(user);
        console.log(data);
        setBoards(data.map((el) => el.name));
        if (data[0]) {
          setCurrentBoard(data[0]);
          setAppState('stable');
        } else {
          setAppState('creating');
        }
      }
    }
    if (appState === 'check') {
      console.log('CHECK');
    }
  }, [appState]);

  const authHandler = (state: boolean) => {
    if (state) {
      setAppState('logged');
    }
  };

  const loginElement = appState === 'unlogged' && (
    <Wrapper className="wrapper_dark">
      <Login stateHandler={authHandler} userHandler={userHandler} boards />
    </Wrapper>
  );
  const CreateNewBoardElement = appState === 'creating' && (
    <Wrapper className="wrapper_dark">
      <CreateNewBoard appStateHandler={appStateHandler} />
    </Wrapper>
  );
  return (
    <div className="app">
      {loginElement}
      {CreateNewBoardElement}
      <AppHeader
        user={user}
        boards={boards}
        changeCurrentBoard={changeCurrentBoard}
        appStateHandler={appStateHandler}
      />
      <Board
        memberList={currentBoard.members}
        currentBoard={currentBoard.name}
        data={currentBoard.tasks}
        boardId={currentBoard.id}
      />
    </div>
  );
};
export default App;
