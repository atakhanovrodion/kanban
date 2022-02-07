import {
	createSlice,
	Dispatch,
	ThunkAction,
	AnyAction,
	ThunkDispatch,
} from '@reduxjs/toolkit';
import Api from '../api';

import store from '../store';

export const boardSlice = createSlice({
	name: 'board',
	initialState: {
		boardName: '',
		headers: ['Todo', 'Done'],
		members: [],
		tasks: [],
	},
	reducers: {
		setHeaders: (state, action) => {
			state.headers = action.payload;
		},
		setBoardName: (state, action) => {
			state.boardName = action.payload;
		},
		setMembers: (state, action) => {
			state.members = action.payload;
		},
		setTasks: (state, action) => {
			state.tasks = action.payload;
		},
	},
});

const { setHeaders, setBoardName, setMembers, setTasks } = boardSlice.actions;

export const selectBoardName = (state: RootState) => state.board.boardName;
export const selectHeaders = (state: RootState) => state.board.headers;
export const selectMembers = (state: RootState) => state.board.members;
export const selectTasks = (state: RootState) => state.board.tasks;

export const addBoard =
	(
		boardName: string,
		headers: string[]
	): ThunkAction<void, RootState, unknown, AnyAction> =>
	(dispatch, getState) => {
		try {
			const api = new Api();
			const res = api.addBoard(boardName, headers);
		} catch (err) {
			console.error(err);
		}
	};

export const getBoard =
	(boardId: string): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch, getState) => {
		try {
			const api = new Api(getState().app.token);

			const { headers, boardName, members, tasks } = await api.getBoard(
				boardId
			);

			dispatch(setHeaders(headers));
			dispatch(setBoardName(boardName));
			dispatch(setMembers(members));
			dispatch(setTasks(tasks));
		} catch (err) {
			console.error(err);
		}
	};
export const addTask =
	(task: {
		text: string;
		color: string;
		header: string;
	}): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch, getState) => {
		try {
			const api = new Api(getState().app.token);
			const res = await api.addTask(getState().app.currentBoard, task);
		} catch (error) {
			console.error(error);
		}
	};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default boardSlice.reducer;
