import request from 'supertest';
import mongoose from 'mongoose';
import { WebSocket } from 'ws';
import app from '../app';
import { User } from '../models/User';
import issueToken from './helpers/issueToken';
import { Board } from '../models/Board';

let user1Token: string;
let user2Token: string;
let boardId: string;
beforeAll(async () => {
	try {
		await mongoose.connect('mongodb://localhost:27017/tasks');
		const user1 = new User({
			userName: 'USER_NAME_1',
			hash: 'hash',
		});
		const user2 = new User({
			userName: 'USER_NAME_2',
			hash: 'hash',
		});
		const user1Id = user1._id;
		const user2Id = user2._id;
		user1Token = issueToken({
			userName: user1.userName,
			_Id: user1Id.toString(),
		});
		user2Token = issueToken({
			userName: user2.userName,
			_Id: user2Id.toString(),
		});
		const testBoard = new Board({
			boardName: 'testBoard',
			headers: ['first', 'second'],
			members: [user1Id, user2Id],
			tasks: [],
		});
		boardId = testBoard._id.toString();
		user1.boards?.push(testBoard._id);
		user2.boards?.push(testBoard._id);

		await user1.save();
		await user2.save();
		await testBoard.save();
	} catch (error) {
		console.error(error);
	}
});
afterAll(async () => {
	await User.deleteMany({});
	await Board.deleteMany({});
	await mongoose.connection.close();
});

describe('test', () => {
	it.todo(
		'can add new task and second user get updated board'
	); /* async () => {
		const url = `/board/${boardId}/`;
		//	const socket1 = new WebSocket(`ws://localhost:3000/board/${boardId}`);
		//	const socket2 = new WebSocket(`ws://localhost:3000/board/${boardId}`);
		const res = await request(app)
			.post(url)
			.set('Authorization', user1Token)
			.send({
				action: 'add',
				payload: {
					text: 'firtsTask',
					header: 'first',
					color: 'red',
				},
			});

		expect(res.status).toBe(200);
	}); */
});
