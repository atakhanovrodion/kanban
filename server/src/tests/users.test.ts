import request from 'supertest';
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import app from '../app';
import { User } from '../models/User';
import issueToken from './helpers/issueToken';
import { Board } from '../models/Board';

let user1Token: string;
let user2Token: string;
let boardId: string;
let user2Id: any;
let notificationId: string;
beforeAll(async () => {
	try {
		await mongoose.connect('mongodb://localhost:27017/users');
		const user1 = new User({
			userName: 'USER_NAME_1',
			hash: 'hash',
		});
		const user2 = new User({
			userName: 'USER_NAME_2',
			hash: 'hash',
		});
		const user1Id = user1._id;
		user2Id = user2._id;
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
			members: [user1Id],
			tasks: [],
		});
		boardId = testBoard._id.toString();
		user1.boards?.push(testBoard._id);
		notificationId = uuid();
		user1.notifications?.push({
			id: notificationId,
			type: 'invite',
			boardId,
			from: 'user2',
		});
		user1.notifications?.push({
			id: uuid(),
			type: 'invite',
			boardId,
			from: 'user2',
		});

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
	it('receives 200 and user', async () => {
		const res = await request(app)
			.get('/user')
			.set('Authorization', user1Token);

		expect(res.status).toBe(200);
		expect(typeof res.body.userName === 'string').toBeTruthy();
		expect(Array.isArray(res.body.boards)).toBeTruthy();
		expect(Array.isArray(res.body.notifications)).toBeTruthy();
	});
	it('user can accept invite', async () => {
		const res = await request(app)
			.post(`/boards/${boardId}/invite`)
			.set('Authorization', user1Token)
			.send({
				userId: user2Id.toString(),
			});
		expect(res.status).toBe(200);
		const secRes = await request(app)
			.get(`/user`)
			.set('Authorization', user2Token);
		expect(secRes.status).toBe(200);

		expect(secRes.body.notifications.length).toBeGreaterThan(0);

		expect(typeof secRes.body.notifications[0].id === 'string').toBeTruthy();
		expect(secRes.body.notifications[0].type).toBe('invite');
		expect(secRes.body.notifications[0].boardId).toBe(boardId);
		expect(secRes.body.notifications[0].from).toBe('USER_NAME_1');
		const trirdRes = await request(app)
			.post('/accept')
			.set('Authorization', user2Token)
			.send({ notificationId: secRes.body.notifications[0].id });
		expect(trirdRes.status).toBe(200);
		const fourRes = await request(app)
			.get('/user')
			.set('Authorization', user2Token);

		expect(fourRes.status).toBe(200);
		expect(fourRes.body.notifications.length).toBe(0);
		expect(fourRes.body.boards.length).toBeGreaterThan(0);
		const board = await Board.findById(boardId);
		expect(board?.members.length).toBe(2);
	});
	it('user can declines invite', async () => {
		const res = await request(app)
			.post(`/decline`)
			.set('Authorization', user1Token)
			.send({ notificationId });
		expect(res.status).toBe(200);

		const fourRes = await request(app)
			.get('/user')
			.set('Authorization', user1Token);

		expect(fourRes.status).toBe(200);
		expect(fourRes.body.notifications.length).toBe(1);
	});
});
