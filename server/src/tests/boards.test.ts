import request from 'supertest';
import mongoose from 'mongoose';
import { User, IUser } from '../models/User';
import { Board, IBoard } from '../models/Board';
import issueToken from './helpers/issueToken';
import app from '../app';

let testToken: string;
let boardId: string;
let testUserId: any;
beforeAll(async () => {
	await mongoose.connect('mongodb://localhost:27017/boarsdtest');
	const testUser = new User<IUser>({
		userName: 'test',
		hash: 'test',
	});
	testUserId = testUser._id;
	testToken = issueToken({
		userName: testUser.userName,
		_Id: testUser._id.toString(),
	});
	const testBoard = new Board<IBoard>({
		boardName: 'testBoard',
		headers: ['test', 'test1', 'test2'],
		members: [testUser._id],
		tasks: [],
	});
	boardId = testBoard._id.toString();
	testUser.boards?.push(testBoard._id);

	await testUser.save();
	await testBoard.save();
});
afterAll(async () => {
	await User.deleteMany({});
	await Board.deleteMany({});
	await mongoose.connection.close();
});

describe('BOARDS', () => {
	it('Should receive 200 and list of boardIds', async () => {
		const res = await request(app)
			.get('/boards/')
			.set('Authorization', testToken);
		expect(res.status).toBe(200);
		expect(res.body).toBeTruthy();
	});
	it('Should receive 200 and board', async () => {
		const res = await request(app)
			.get(`/boards/${boardId}`)
			.set('Authorization', testToken);
		expect(res.status).toBe(200);
		expect(typeof res.body === 'object').toBeTruthy();
		expect(res.body.boardName).toBe('testBoard');
	});
	it('Can create a new board', async () => {
		const res = await request(app)
			.post('/boards/add')
			.set('Authorization', testToken)
			.send({
				boardName: 'test2',
				headers: ['todo', 'kekw', 'done'],
				tasks: [],
			});

		expect(res.status).toBe(200);
		const user = await User.findById(testUserId);
		expect(user?.boards?.length).toBeGreaterThan(1);
	});
	it('Get 403 when trying to create board with same boardName', async () => {
		const res = await request(app)
			.post('/boards/add')
			.set('Authorization', testToken)
			.send({
				boardName: 'testBoard',
				headers: ['todo', 'kekw', 'done'],
				tasks: [],
			});

		expect(res.status).toBe(403);
	});
});
