import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

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

export default class Api {
	token: string | undefined;
	client: AxiosInstance;
	constructor(token: string | undefined = undefined) {
		this.client = axios.create(config);
		this.token = token;
		this.client.interceptors.request.use((config) => {
			if (!this.token) {
				return config;
			}
			const newConfig = {
				headers: {},
				...config,
			};
			newConfig.headers.Authorization = this.token;
			return newConfig;
		});
		this.client.interceptors.response.use(
			(res) => res,
			async (err) => {
				if (
					!global.localStorage.refreshToken ||
					err.response.status !== 401 ||
					err.config.retry
				) {
					throw err;
				}
				const { data } = await this.client.post('/auth/refresh', {
					refreshToken: global.localStorage.refreshToken,
				});
				this.token = data.token;
				global.localStorage.setItem('refreshToken', data.refreshToken);
				const newRequest = {
					...err.config,
					retry: true,
				};
				return this.client(newRequest);
			}
		);
	}
	async login(userName: string, password: string): Promise<AxiosResponse> {
		return await this.client.post('/auth/login', {
			userName,
			password,
		});
	}
	async getBoards(): Promise<IBoard[] | any> {
		const res: AxiosResponse = await this.client.get(`/boards/`);
		console.log(res);
		return res.data;
	}
	async getBoard(boardId: any): Promise<any> {
		console.log('BOARD');
		const queryParam = boardId.toString();
		const res = await this.client.get(`/boards/${queryParam}`);

		return res.data;
	}
	async addBoard(boardName: string, headers: string[]): Promise<any> {
		const res = await this.client.post('/boards/add', { boardName, headers });
		return res.data;
	}
	async getUser(): Promise<{ userName: string; boards: string[] }> {
		const res = await this.client.get('/user');
		console.log(res);
		return res.data;
	}
	async logout(): Promise<Response> {
		return await this.client.post('/auth/logout');
	}
	async addTask(
		boardId: string,
		data: { text: string; header: string; color: string }
	): Promise<Response> {
		return await this.client.post(`/board/${boardId}`, {
			action: 'add',
			payload: data,
		});
	}
	async register(userName: string, password: string): Promise<AxiosResponse> {
		const res = await this.client.post('/auth/register', {
			userName,
			password,
		});
		return res;
	}
}

export type { ITask, IBoard };
