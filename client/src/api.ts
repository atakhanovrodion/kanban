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
	console.log('login');
	const res: AxiosResponse = await axios.post(
		'/login',
		{
			userName,
			password,
		},
		config
	);
	return res;
};

const getBoards = async (token: string): Promise<IBoard[]> => {
	config.headers.authorization = token;
	const res: AxiosResponse = await axios.get(`/boards/`, config);
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
	const res = await axios.post('/register', { userName, password }, config);
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

const addBoard = async (
	boardName: string,
	headers: string[],
	token: string
): Promise<any> => {
	try {
		const res = await axios.post(
			'/board',
			{ boardName, headers, token },
			config
		);

		return res.data;
	} catch (err) {
		console.log(err);
		return 'test';
	}
};

export type { ITask, IBoard };
export { getBoards, login, setBoard, register, addBoard, getBoard };
