import React, { BaseSyntheticEvent, useState } from 'react';
import { tryAuth, registrate } from '../api';
import '../styles/login.css';

type LoginProps = {
  stateHandler: (state: boolean) => void;
  userHandler: (user: string) => void;
};

const Login = ({ stateHandler, userHandler }: LoginProps): JSX.Element => {
  const [login, setLogin] = useState('new');
  const [password, setPassword] = useState('new');
  const [isLogin, setIsLogin] = useState(true);
  const onSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (isLogin) {
      if ((await tryAuth(login, password))[0] === '1') {
        userHandler(login);
        setLogin('');
        setPassword('');
        stateHandler(true);
      }
    }
    if ((await tryAuth(login, password))[0] === '0') {
      registrate(login, password);
      userHandler(login);
      setLogin('');
      setPassword('');
      stateHandler(true);
    }
  };
  const switchView = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="login">
      <form onSubmit={onSubmit}>
        <span className="login_text">{isLogin ? 'Log In' : 'Registration'}</span>
        <input
          className="login_input"
          value={login}
          type="text"
          onChange={(e: BaseSyntheticEvent) => {
            setLogin(e.target.value);
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
          {isLogin ? 'LogIn' : 'Sign up'}
        </button>
        <span className="login_bottom">
          {isLogin ? 'Doenst have an account?' : 'Have an account?'}{' '}
          <span className="login_bottom_ref" onClick={switchView}>
            {isLogin ? 'Register now.' : 'Log in.'}
          </span>
        </span>
      </form>
    </div>
  );
};

export default Login;
