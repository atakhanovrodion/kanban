import React, { useState } from 'react';

import AppHeader from './AppHeader';
import Board from './Board';

import '../styles/app.css';

const App = (): JSX.Element => {
  const [user, setUser] = useState('admin');
  const [boards, setBoards] = useState(['myboard', 'test']);

  return (
    <div className="app">
      <AppHeader user={user} boards={boards} />
      <Board />
    </div>
  );
};
export default App;
