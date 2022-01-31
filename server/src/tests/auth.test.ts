import request from 'supertest';
import { pbkdf2Sync } from 'crypto';
import mongoose from 'mongoose';
import app from '../app';
import { IUser, User } from '../models/User';
import issueToken from './helpers/issueToken';

const { PASSWORD_SALT } = process.env;

const testHash = pbkdf2Sync('test', PASSWORD_SALT, 5, 25, 'sha512').toString(
	'hex'
);
let testToken: string;
let logoutToken: string;
let testId: string;
const testUserName = 'test';
beforeAll(async () => {
	await mongoose.connect('mongodb://localhost:27017/authtest');
	const testUser = new User<IUser>({
		userName: testUserName,
		hash: testHash,
	});
	testId = testUser._id.toString();
	testToken = issueToken({ userName: testUserName, _Id: testId });
	const secondUser = new User<IUser>({
		userName: 'second',
		hash: testHash,
		refreshToken: 'TEST_REFRESH_TOKEN',
	});
	const thirdUser = new User<IUser>({
		userName: 'third',
		hash: testHash,
		refreshToken: 'LOGOUT_REFRESH_TOKEN',
	});
	logoutToken = issueToken({
		userName: 'third',
		_Id: thirdUser._id.toString(),
	});
	thirdUser.token = logoutToken;
	await testUser.save();
	await secondUser.save();
	await thirdUser.save();
});
afterAll(async () => {
	await User.deleteMany({});
	await mongoose.connection.close();
});

describe('AUTORIZATION', () => {
	it('should return 200 &  tokens if credentials are valid', (done) => {
		request(app)
			.post('/auth/login')
			.send({ userName: testUserName, password: 'test' })
			.then((res) => {
				expect(res.status).toBe(200);
				expect(typeof res.body.token === 'string').toBeTruthy();
				expect(typeof res.body.refreshToken === 'string').toBeTruthy();

				request(app)
					.post('/auth/refresh')
					.send({ refreshToken: res.body.refreshToken })
					.then((secRes) => {
						expect(secRes.status).toBe(200);
						expect(typeof secRes.body.token === 'string').toBeTruthy();
						expect(typeof secRes.body.refreshToken === 'string').toBeTruthy();
						done();
					});
			});
	});
	it('should return 403 if credentials are not valid', (done) => {
		request(app)
			.post('/auth/login')
			.send({ userName: 'wrong', password: 'new' })
			.expect(403);
		done();
	});
	it('should return 200 if token is valid', (done) => {
		const token = testToken;
		request(app)
			.get('/users')
			.set('Authorization', token)
			.then((res) => {
				expect(res.status).toBe(200);
				done();
			});
	});
	it('should  receives 401 on expired token', (done) => {
		const expiredToken = issueToken(
			{
				userName: testUserName,
				_Id: testId,
			},
			{ expiresIn: '1ms' }
		);
		request(app)
			.get('/users')
			.set('Authorization', expiredToken)
			.then((res) => {
				expect(res.status).toBe(401);
				done();
			});
	});
	it('User can get new access token with refresh token', (done) => {
		request(app)
			.post('/auth/refresh')
			.send({ refreshToken: 'TEST_REFRESH_TOKEN' })
			.then((res) => {
				expect(res.status).toBe(200);

				expect(typeof res.body.token === 'string').toBeTruthy();
				expect(typeof res.body.refreshToken === 'string').toBeTruthy();
				done();
			});
	});
	it('should return 404 on invalid refreshToken', (done) => {
		request(app)
			.post('/auth/refresh')
			.send({ refreshToken: 'TEST_REFRESH_TOKEN' })
			.then((secRes) => {
				expect(secRes.status).toBe(404);
				done();
			});
	});
	it('Resfresh token becomes invalid on logout', (done) => {
		request(app)
			.post('/auth/logout')
			.set('Authorization', logoutToken)
			.then((res) => {
				expect(res.status).toBe(200);
				request(app)
					.post('/auth/refresh')
					.send({ refreshToken: 'LOGOUT_REFRESH_TOKEN' })
					.then((refRes) => {
						expect(refRes.status).toBe(404);
					});
				request(app)
					.get('/users')
					.send({ refreshToken: logoutToken })
					.then((useRes) => {
						expect(useRes.status).toBe(403);
					});
				done();
			});
	});
	it('should return 200 and token,username,refreshtoken on valid credentials ', (done) => {
		request(app)
			.post('/auth/register')
			.send({ userName: 'registertest', password: 'testpass' })
			.then((res) => {
				expect(res.status).toBe(200);
				expect(typeof res.body.token === 'string').toBeTruthy();
				expect(typeof res.body.refreshToken === 'string').toBeTruthy();
				User.find({ userName: res.body.userName })
					.exec()
					.then((user) => {
						expect(user).toBeTruthy();
						done();
					});
			});
	});
	it('should return 404  on invalid credentials', (done) => {
		request(app)
			.post('/auth/register')
			.send({ userName: '', password: 'testpass' })
			.then((res) => {
				expect(res.status).toBe(404);
				done();
			});
	});
	it('should return 403 when trying to register already existen user', (done) => {
		request(app)
			.post('/auth/register')
			.send({ userName: 'test', password: 'testpass' })
			.then((res) => {
				expect(res.status).toBe(403);
				done();
			});
	});
});
