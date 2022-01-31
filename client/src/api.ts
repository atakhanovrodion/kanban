import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const config: AxiosRequestConfig = {
	baseURL: 'http://localhost:3000/',
	headers: { crossdomain: true },
};

interface ITask {
	text: string;
	header: string;
	color: string;
	members: string[];
	labels?: string[];
	description?: string;
}
interface IBoard {
	name: string;
	headers: string[];
	members: string[];
	tasks: ITask[][];
}

const login = async (
	userName: string,
	password: string
): Promise<AxiosResponse> => {
	console.log('/auth/login');
	const res: AxiosResponse = await axios.post(
		'/auth/login',
		{
			userName,
			password,
		},
		config
	);
	return res;
};

const tryGetBoards = async (token: string): Promise<IBoard[] | any> => {
	try {
		config.headers.authorization = token || global.localStorage.token;
		const res: AxiosResponse = await axios.get(`/boards/`, config);
		return res.data;
	} catch (err: any) {
		if (err.response) {
			if (err.response.status === 401) {
				tryRefresh(global.localStorage.refreshToken);
			}
		}
		return err;
	}
};

const tryRefresh = async (refreshToken: string) => {
	const token = refreshToken || global.localStorage.refreshToken;

	const res: AxiosResponse = await axios.post(
		'/auth/refresh',
		{
			refreshToken: token,
		},
		config
	);
	return res.data;
};

const setBoard = async (id: number, data: IBoard): Promise<string> => {
	console.log('here');
	const res = await axios.post(`/boards/${id}`, data, config);
	return res.data;
};

const register = async (
	userName: string,
	password: string
): Promise<AxiosResponse> => {
	const res = await axios.post(
		'/auth/register',
		{ userName, password },
		config
	);
	console.log(res);
	return res;
};

const getBoard = async (boardId: any, token: string): Promise<any> => {
	try {
		config.headers.authorization = token;
		const queryParam = boardId.toString();
		const res = await axios.get(`/board/${queryParam}`, config);
		return res.data;
	} catch (err) {
		return err;
	}
};

const tryAddBoard = async (
	boardName: string,
	headers: string[],
	token: string
): Promise<any> => {
	try {
		config.headers.authorization = token || global.localStorage.token;
		const res = await axios.post('/boards/add', { boardName, headers }, config);

		return res.data;
	} catch (err: any) {
		console.log(err);
		if (err.response) {
			if (err.response.status === 401) {
				tryRefresh(global.localStorage.refreshToken);
			}
		}
	}
};

export type { ITask, IBoard };
export {
	tryGetBoards,
	login,
	setBoard,
	register,
	tryAddBoard,
	getBoard,
	tryRefresh,
};
