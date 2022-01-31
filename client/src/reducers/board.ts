import { createSlice, Dispatch, Store } from '@reduxjs/toolkit';
import { tryAddBoard } from '../api';

export const boardSlice = createSlice({
	name: 'board',
	initialState: {
		boardName: '',
		headers: ['Todo', 'Done'],
		members: [],
		tasks: [],
	},
	reducers: {},
});

export const selectBoardName = (state) => state.board.boardName;

export const selectHeaders = (state) => state.board.headers;

export const selectMembers = (state) => state.board.members;

export const addBoard =
	(boardName: string, headers: string[]) => (dispatch: Dispatch, getState) => {
		tryAddBoard(boardName, headers, getState().app.token)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

export default boardSlice.reducer;
