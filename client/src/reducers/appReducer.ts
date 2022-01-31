import { createSlice, Dispatch, Store } from '@reduxjs/toolkit';
import { login, register, tryRefresh } from '../api';

import { tryGetBoards } from '../api';

interface IState {
	appState: string;
	userName: string;
	token: string;
	refreshToken: string;
}

export const appSlice = createSlice({
	name: 'app',
	initialState: {
		appState: 'unlogged',
		userName: '',
		token: '',
		refreshToken: '',
		isLoading: false,
	},
	reducers: {
		setUserName: (state, action) => {
			state.userName = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
		setRefreshToken: (state, action) => {
			state.refreshToken = action.payload;
		},
		setAppState: (state, action) => {
			state.appState = action.payload;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
});

export const { setIsLoading } = appSlice.actions;

const { setUserName, setToken, setRefreshToken, setAppState } =
	appSlice.actions;

const { token } = appSlice.getInitialState();

export const tryLogin =
	(userName: string, password: string) => (dispatch: Dispatch, getState) => {
		dispatch(setIsLoading(true));
		login(userName, password)
			.then((res) => {
				dispatch(setUserName(res.data.userName));
				dispatch(setToken(res.data.token));
				dispatch(setRefreshToken(res.data.refreshToken));
				global.localStorage.setItem('token', getState().app.token);

				global.localStorage.setItem(
					'refreshToken',
					getState().app.refreshToken
				);
				tryGetBoards(getState().app.token)
					.then((res) => {
						if (res.length > 0) {
							console.log(res);

							dispatch(setIsLoading(false));
						} else {
							dispatch(setAppState('creating'));

							dispatch(setIsLoading(false));
						}
					})
					.catch((err) => {
						console.log(err);

						dispatch(setIsLoading(false));
					});
				dispatch(setIsLoading(false));
			})
			.catch((err) => console.error(err));
	};
export const tryRegister =
	(userName: string, password: string) => (dispatch: Dispatch, getState) => {
		dispatch(setIsLoading(true));
		register(userName, password)
			.then((res) => {
				dispatch(setUserName(res.data.userName));
				dispatch(setToken(res.data.token));
				dispatch(setRefreshToken(res.data.refreshToken));
				dispatch(setAppState('creating'));

				global.localStorage.setItem('token', getState().app.token);

				global.localStorage.setItem(
					'refreshToken',
					getState().app.refreshToken
				);

				dispatch(setIsLoading(false));
			})
			.catch((err) => console.error(err));
	};

export const getBoards = () => (dispatch: Dispatch, getState) => {
	dispatch(setIsLoading(true));
	tryGetBoards(getState().app.token)
		.then((res) => {
			if (res) {
				dispatch(setIsLoading(false));
			} else {
				dispatch(setAppState('creating'));
				dispatch(setIsLoading(false));
			}
		})
		.catch((err) => {
			console.log(err);

			dispatch(setIsLoading(false));
		});
};

export const selectAppState = (state) => state.app.appState;
export const selectUserName = (state) => state.app.userName;

export default appSlice.reducer;
