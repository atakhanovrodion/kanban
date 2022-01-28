import request from 'supertest';
import app from '../app';
import issueToken from './helpers/issueToken';

describe('AUTORIZATION', () => {
	it('should return 200 &  tokens if credentials are valid', (done) => {
		request(app)
			.post('auth/login')
			.send({ userName: 'new', password: 'new' })
			.then((res) => {
				expect(res.status).toBe(200);
				expect(typeof res.body.token === 'string').toBeTruthy();
				expect(typeof res.body.refreshToken === 'string').toBeTruthy();
				done();
			})
			.catch((err) => {
				done();
			});
	});
	it('should return 403 if credentials are not valid', (done) => {
		request(app)
			.post('auth/login')
			.send({ userName: 'wrong', password: 'new' })
			.expect(403);
		done();
	});
	it('should return 200 if token is valid', (done) => {
		const token = issueToken({
			userName: 'new',
			_id: '61f4147b9ab98ef46c58fc1f',
		});
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
				userName: 'new',
				_id: '61f4147b9ab98ef46c58fc1f',
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

	// mongo fixture
	it.todo('User can get new access token with refresh token', (done) => {
		request(app)
			.post('/auth/refresh')
			.send({ refreshToken: 'e8e3724d-69a6-4819-bc09-5f0c3bb7e2ad' })
			.then((res) => {
				expect(res.status).toBe(200);

				expect(typeof res.body.token === 'string').toBeTruthy();
				expect(typeof res.body.refreshToken === 'string').toBeTruthy();
				done();
			});
	});
});
test.todo('User can only user refresh token once');
test.todo('Resfresh token becomes invalid on logout');
test.todo('Multiply refresh token are valid');
