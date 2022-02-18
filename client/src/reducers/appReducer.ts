import {
	createSlice,
	Dispatch,
	ThunkAction,
	AnyAction,
} from '@reduxjs/toolkit';
import Api from '../api';
import store from '../store';

interface AppState {
	appState: string;
	userName: string;
	token: string;
	isLoading: boolean;
	currentBoard: string;
	usersList: [];
	boards: [];
	notifications: { id: string; type: string; boardId: string; from: string }[];
}

const initialState: AppState = {
	appState: 'unlogged',
	userName: '',
	token: '',
	isLoading: false,
	currentBoard: '',
	usersList: [],
	boards: [],
	notifications: [],
};

export const appSlice = createSlice({
	name: 'app',
	initialState: initialState,
	reducers: {
		setUserName: (state, action) => {
			state.userName = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
		setAppState: (state, action) => {
			state.appState = action.payload;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setCurrentBoard: (state, action) => {
			state.currentBoard = action.payload;
		},
		setUsersList: (state, action) => {
			state.usersList = action.payload;
		},
		setBoards: (state, action) => {
			state.boards = action.payload;
		},
		setNotifications: (state, action) => {
			state.notifications = action.payload;
		},
	},
});
const {
	setUserName,
	setToken,
	setUsersList,
	setBoards,
	setIsLoading,
	setCurrentBoard,
	setAppState,
	setNotifications,
} = appSlice.actions;

export { setIsLoading, setCurrentBoard, setAppState };

export const login =
	(userName: string, password: string) => async (dispatch: Dispatch) => {
		try {
			const api = new Api();
			const { data } = await api.login(userName, password);
			dispatch(setUserName(data.userName));
			dispatch(setToken(data.token));
			api.token = data.token;
			global.localStorage.setItem('refreshToken', data.refreshToken);
			if (data.boards.length > 0) {
				dispatch(setCurrentBoard(data.boards[0]));
				dispatch(setAppState('logged'));
			} else {
				dispatch(setAppState('creating'));
			}
		} catch (err) {
			console.error(err);
		}
	};
export const register =
	(
		userName: string,
		password: string
	): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch) => {
		try {
			dispatch(setIsLoading(true));
			const api = new Api();
			const { data } = await api.register(userName, password);
			dispatch(setUserName(data.userName));
			dispatch(setToken(data.token));

			api.token = data.token;

			global.localStorage.setItem('refreshToken', data.refreshToken);
			dispatch(setAppState('creating'));
			dispatch(setIsLoading(false));
		} catch (err) {
			console.error(err);
		}
	};

export const getBoards =
	(): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch, getState) => {
		try {
			const api = new Api(getState().app.token);
			const res = await api.getBoards();
			if (getState().app.appState === 'logged') {
				dispatch(setBoards(res));
			}
		} catch (err) {
			console.error(err);
		}
	};

export const getUser =
	(): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
		try {
			dispatch(setIsLoading(true));
			const api = new Api();
			const { userName, boards, notifications } = await api.getUser();
			dispatch(setNotifications(notifications));
			dispatch(setToken(api.token));
			dispatch(setUserName(userName));
			if (boards.length > 0) {
				dispatch(setCurrentBoard(boards[0]));
				dispatch(setAppState('logged'));
				dispatch(setIsLoading(false));
			} else {
				dispatch(setAppState('creating'));

				dispatch(setIsLoading(false));
			}
		} catch (err) {
			console.error(err);
		}
	};
export const logout =
	(): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch, getState) => {
		try {
			const api = new Api(getState().app.token);
			console.log(await api.logout());
			dispatch(setUserName(''));
			dispatch(setToken(''));
			dispatch(setCurrentBoard(''));
			dispatch(setAppState('unlogged'));

			global.localStorage.setItem('refreshToken', '');
		} catch (err) {
			console.error(err);
		}
	};
export const getUsers =
	(): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch, getState) => {
		try {
			const api = new Api(getState().app.token);
			const res = await api.getUsers();
			const users = res.filter(
				(user) => user.userName !== getState().app.userName
			);
			dispatch(setUsersList(users));
		} catch (err) {
			console.error(err);
		}
	};
export const notificationHandle =
	(
		response: string,
		notificationId: string
	): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch, getState) => {
		try {
			const api = new Api(getState().app.token);
			if (response === 'accept') {
				await api.accept(notificationId);
			} else {
				await api.decline(notificationId);
			}
			const res = await api.getUser();
			dispatch(setNotifications(res.notifications));
		} catch (err) {
			console.error(err);
		}
	};

export const selectAppState = (state: RootState) => state.app.appState;
export const selectUserName = (state: RootState) => state.app.userName;

export const selectNotifications = (state: RootState) =>
	state.app.notifications;
export const selectCurrentBoard = (state: RootState) => state.app.currentBoard;

export const selectBoards = (state: RootState) => state.app.boards;
export const selectUsersList = (state: RootState) => state.app.usersList;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default appSlice.reducer;
