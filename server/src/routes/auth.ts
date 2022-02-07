import { pbkdf2Sync } from 'crypto';
import { sign } from 'jsonwebtoken';
import { Router, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { User, IUser } from '../models/User';
import { verifyToken, IRequest } from '../middleware/auth';

const { JWT_SECRET_KEY, PASSWORD_SALT } = process.env;

const router = Router();

router.post('/register', async (req, res): Promise<Response> => {
	try {
		if (!(req.body.userName && req.body.password)) {
			return res.status(404).send('not valid login or password');
		}

		const user = await User.findOne({ userName: req.body.userName });
		if (user) {
			return res.status(403).json({ error: 'user already exist' });
		}
		const hash = pbkdf2Sync(
			req.body.password,
			PASSWORD_SALT,
			5,
			25,
			'sha512'
		).toString('hex');
		const newUser = await User.create<IUser>({
			userName: req.body.userName,
			hash,
		});
		const token = sign(
			// eslint-disable-next-line
			{ _Id: newUser._id, userName: newUser.userName },
			JWT_SECRET_KEY,
			{ expiresIn: '15m' }
		);
		newUser.token = token;
		newUser.refreshToken = uuid();
		await newUser.save();
		return res.status(200).json(newUser);
	} catch (err) {
		console.log(err);
		return res.status(404);
	}
});

router.post('/login', async (req, res): Promise<Response> => {
	try {
		const hash = pbkdf2Sync(
			req.body.password,
			PASSWORD_SALT,
			5,
			25,
			'sha512'
		).toString('hex');
		const user = await User.findOne({ userName: req.body.userName, hash });
		if (user) {
			const token = sign(
				// eslint-disable-next-line
				{ _Id: user._id, userName: user.userName },
				JWT_SECRET_KEY,
				{ expiresIn: '15m' }
			);
			user.token = token;
			user.refreshToken = uuid();
			await user.save();
			return res.status(200).send({
				userName: user.userName,
				boards: user.boards,
				token: user.token,
				refreshToken: user.refreshToken,
			});
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
			{ _Id: user._id, userName: user.userName },
			JWT_SECRET_KEY,
			{ expiresIn: '15m' }
		);
		user.token = token;
		user.refreshToken = uuid();
		await user.save();
		return res.status(200).json(user);
	}
	return res.status(404).send('invalid refresh token');
});

router.post(
	'/logout',
	verifyToken,
	async (req: IRequest, res): Promise<Response> => {
		const user = await User.findById(req.user._Id);
		if (user) {
			user.token = undefined;
			user.refreshToken = undefined;
			await user.save();
			return res.status(200).send('logouted');
		}
		return res.status(404);
	}
);

export default router;
