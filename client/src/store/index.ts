import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../reducers/appReducer';
import boardReducer from '../reducers/board';

export default configureStore({
	reducer: { app: appReducer, board: boardReducer },
});
