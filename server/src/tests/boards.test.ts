import request from 'supertest';
import mongoose from 'mongoose';
import { User, IUser } from '../models/User';
import { Board, IBoard } from '../models/Board';
import issueToken from './helpers/issueToken';
import app from '../app';

let testToken: string;
let boardId: string;
beforeAll(async () => {
	await mongoose.connect('mongodb://localhost:27017/boarsdtest');
	const testUser = new User<IUser>({
		userName: 'test',
		hash: 'test',
	});

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
	await testUser.save();
	await testBoard.save();
});

describe('BOARDS', () => {
	it('Should receive 200 and list of boardIds', async () => {
		const res = await request(app)
			.get('/boards/')
			.set('Authorization', testToken);
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBeTruthy();
	});
	it('Should receive 200 and board', async () => {
		const res = await request(app)
			.get(`/boards/${boardId}`)
			.set('Authorization', testToken);
		expect(res.status).toBe(200);
		expect(typeof res.body === 'object').toBeTruthy();
		expect(res.body.boardName).toBe('testBoard');
	});
});
