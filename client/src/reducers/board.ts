import { createSlice, ThunkAction, AnyAction } from '@reduxjs/toolkit';
import Api from '../api';

import store from '../store';

interface BoardState {
	boardName: string;
	headers: string[];
	members: string[];
	currentTask: string;
	dropColumn: string;
	tasks: {
		text: string;
		header: string;
		color: string;
		members: string[];
		labels: string[];
		_id: string;
	}[];
}

const initialState: BoardState = {
	boardName: '',
	headers: ['Todo', 'Done'],
	members: [],
	currentTask: '',
	dropColumn: '',
	tasks: [],
};

export const boardSlice = createSlice({
	name: 'board',
	initialState: initialState,
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
		setCurrentTask: (state, action) => {
			state.currentTask = action.payload;
		},
		setDropColumn: (state, action) => {
			state.dropColumn = action.payload;
		},
	},
});

const {
	setHeaders,
	setBoardName,
	setMembers,
	setTasks,
	setCurrentTask,
	setDropColumn,
} = boardSlice.actions;

export const selectBoardName = (state: RootState) => state.board.boardName;
export const selectHeaders = (state: RootState) => state.board.headers;
export const selectMembers = (state: RootState) => state.board.members;
export const selectTasks = (state: RootState) => state.board.tasks;

export { setTasks, setCurrentTask, setDropColumn };

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
export const addUser =
	(userId: string): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch, getState) => {
		try {
			const api = new Api(getState().app.token);
			await api.addUser(userId, getState().app.currentBoard);
		} catch (err) {
			console.error(err);
		}
	};
export const sendTasks =
	(tasks: any): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch, getState) => {
		try {
			const api = new Api(getState().app.token);
			const res = await api.setTasks(getState().app.currentBoard, tasks);
		} catch (error) {
			console.error(error);
		}
	};
export const updateBoard =
	(...args: any): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch, getState) => {
		try {
			const api = new Api(getState().app.token);
			await api.updateBoard(getState().app.currentBoard, ...args);
		} catch (error) {
			console.error(error);
		}
	};
export const removeBoard =
	(): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch, getState) => {
		try {
			const api = new Api(getState().app.token);
			await api.removeBoard(getState().app.currentBoard);
		} catch (error) {
			console.error(error);
		}
	};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default boardSlice.reducer;
