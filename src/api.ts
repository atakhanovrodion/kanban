import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:3000/',
  headers: { crossdomain: true },
};

interface ITask {
  id?: string;
  name: string;
  color: string;
  members?: string[];
  labels?: string[];
  description?: string;
}
interface IBoard {
  id: number;
  name: string;
  headers: string[];
  members: string[];
  tasks: ITask[][];
}

const getHeaders = (): string[] => ['BackLog', 'ToDo', 'Doing', 'Done'];
const getTasks = (): ITask[][] => [
  [
    {
      id: 'mykanban1',
      name: 'do something',
      color: 'yellow',
      members: ['admin@admin.admin'],
      labels: [''],
      description: '',
    },
    {
      id: 'mykanban2',
      name: 'test something',
      color: 'yellow',
      members: ['admin@admin.admin'],
      labels: [''],
      description: '',
    },
    {
      id: 'mykanban3',
      name: 'proterian technology',
      color: 'red',
      members: ['test@test.test'],
      labels: [''],
      description: '',
    },
  ],
  [
    {
      id: 'mykanban4',
      name: 'all members',
      color: 'red',
      members: ['test@test.test', 'SS@kekwait.com', 'admin@admin.admin'],
      labels: [''],
      description: '',
    },
  ],
  [
    {
      id: 'mykanban5',
      name: 'test',
      color: 'blue',
      members: [],
      labels: [''],
      description: '',
    },
  ],
  [
    {
      id: 'mykanban6',
      name: 'testest',
      color: 'green',
      members: ['SS@kekwait.com'],
      labels: [''],
      description: '',
    },
  ],
];

const tryAuth = async (login: string, password: string): Promise<[any]> => {
  const res: AxiosResponse = await axios.post(
    '/login',
    {
      login,
      password,
    },
    config
  );
  return res.data;
};

const getBoards = async (user: string): Promise<IBoard[]> => {
  const res: AxiosResponse = await axios.get(`/boards/${user}`, config);

  return res.data;
};
const setBoard = async (id: number, data: IBoard): Promise<void> => {
  await axios.post(`/boards/${id}`, data, config);
};
const registrate = async (login: string, password: string): Promise<string> => {
  const res = await axios.post('/registration', { login, password }, config);
  return res.data;
};

const addBoard = async (boardName: string, headers: string[]): Promise<string> => {
  const res = await axios.post('/board', { boardName, headers }, config);
  return res.data;
};

export type { ITask, IBoard };
export { getHeaders, getTasks, getBoards, tryAuth, setBoard, registrate, addBoard };
