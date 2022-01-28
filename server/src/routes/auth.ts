import { pbkdf2Sync } from 'crypto';
import { sign } from 'jsonwebtoken';
import { Router, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { User, IUser } from '../models/User';
import { verifyToken, IRequest } from '../middleware/auth';

const { JWT_SECRET_KEY } = process.env;

const router = Router();

router.post('/login', async (req, res): Promise<Response> => {
	try {
		const hash = pbkdf2Sync(
			req.body.password,
			'testsalt',
			5,
			25,
			'sha512'
		).toString('hex');
		const user = await User.findOne({ userName: req.body.userName, hash });
		if (user) {
			const token = sign(
				// eslint-disable-next-line
				{ user_id: user._id, userName: user.userName },
				JWT_SECRET_KEY,
				{ expiresIn: '15m' }
			);
			user.token = token;
			user.refreshToken = uuid();
			await user.save();
			return res.status(200).json(user);
		}
		return res.status(403).json({ error: 'wrong login or password' });
	} catch (err) {
		console.log(err);
		return res.status(404);
	}
});
router.post('/refresh', async (req, res): Promise<Response> => {
	const { refreshToken } = req.body;
	const user = await User.findOne({ refreshToken });
	if (user) {
		const token = sign(
			// eslint-disable-next-line
			{ user_id: user._id, userName: user.userName },
			JWT_SECRET_KEY,
			{ expiresIn: '15m' }
		);
		user.token = token;
		user.refreshToken = uuid();
		await user.save();
		return res.status(200).json(user);
	}
	return res.status(403).send('bad refresh token');
});

export default router;
