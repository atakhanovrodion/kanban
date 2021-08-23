import { readFile, writeFile } from 'fs/promises';
import { pbkdf2, pbkdf2Sync } from 'crypto';
import path from 'path';

interface IUsers {
  nextId: number;
  users: {
    [name: string]: IUser;
  };
}
interface ITask {
  id?: string;
  name: string;
  color: string;
  members?: string[];
  labels?: string[];
  description?: string;
}
interface IUser {
  id: number;
  hash: string;
  boards: string[];
}
interface IBoard {
  id: number;
  name: string;
  headers: string[];
  members: string[];
  tasks: ITask[][];
}
interface IBoards {
  [id: string]: IBoard;
}

const salt = 'testsalt';

const addUser = async (login: string, password: string): Promise<string> => {
  try {
    const rawData = await readFile(path.join(__dirname, '..', 'users.json'));

    const users: IUsers = JSON.parse(rawData.toString());
    pbkdf2(password, salt, 5, 25, 'sha512', (err, derivedKey) => {
      if (err) throw err;

      users.users[login] = {
        id: users.nextId,
        hash: derivedKey.toString('hex'),
        boards: [],
      };
      users.nextId += 1;

      writeFile(path.join(__dirname, '..', 'users.json'), JSON.stringify(users));
    });
    return 'ok';
  } catch (err) {
    console.error(err);
    return 'err';
  }
};
const addBoard = async (
  name: string,
  headers: string[],
  members: string[]
): Promise<string> => {
  try {
    const rawData = await readFile(path.join(__dirname, '..', 'boards.json'));

    const Boards: IBoards = JSON.parse(rawData.toString());
    const id = Number(Object.keys(Boards)[Object.keys(Boards).length - 1]) + 1;
    Boards[id.toString()] = {
      id,
      name,
      headers,
      members,
      tasks: headers.map(() => []),
    };
    writeFile(path.join(__dirname, '..', 'boards.json'), JSON.stringify(Boards));
    return 'ok';
  } catch (err) {
    return 'err';
  }
};

const authenticate = async (login: string, password: string): Promise<[number, any]> => {
  try {
    const data = await readFile(path.join(__dirname, '..', 'users.json'));
    const Users: IUsers = JSON.parse(data.toString());
    if (Users.users[login] === undefined) {
      return [0, 'dont have user '];
    }
    if (
      pbkdf2Sync(password, salt, 5, 25, 'sha512').toString('hex') ===
      Users.users[login].hash
    ) {
      return [1, Users.users[login].boards];
    }
    return [2, 'wrong password'];
  } catch (err) {
    return [3, 'server error'];
  }
};

export { IUsers, IUser, addUser, authenticate, IBoard, IBoards, addBoard };
