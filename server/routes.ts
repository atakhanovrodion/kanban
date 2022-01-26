import { pbkdf2Sync } from 'crypto';

import { verify, sign } from 'jsonwebtoken';
import express, { Response } from 'express';

import expressWs from 'express-ws';
import { Board, IBoard, ITask } from './models/Board';
import { User, IUser } from './models/User';
import { verifyToken, IRequest } from './auth';

const router = express.Router();

// Registration

router.post(
	'/register',
	async (req, res): Promise<Response> => {
		try {
			const user = await User.findOne({ userName: req.body.userName });
			if (user) {
				return res.status(400).json({ error: 'user already exist' });
			}
			const hash = pbkdf2Sync(
				req.body.password,
				'testsalt',
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
				{ user_id: newUser._id, userName: newUser.userName },
				'secret',
				{ expiresIn: '1h' }
			);
			newUser.token = token;
			return res.status(200).json(newUser);
		} catch (err) {
			console.log(err);
			return res.status(404);
		}
	}
);

// Login

router.post(
	'/login',
	async (req, res): Promise<Response> => {
		try {
			console.log('/post login', req.body);
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
					'secret',
					{ expiresIn: '1h' }
				);
				user.token = token;
				return res.status(200).json(user);
			}
			return res.status(401).json({ error: 'wrong login or password' });
		} catch (err) {
			console.log(err);
			return res.status(404);
		}
	}
);

// TODO /board {id}
router.get('/board/:boardId', verifyToken, async (req: IRequest, res) => {
	try {
		const board = await Board.findById(req.params.boardId);
		console.log(board);
		return res.status(200).json(board);
	} catch (err) {
		console.log(err);
		return res.status(404).send('err');
	}
});
// Create new board

router.post(
	'/board',
	verifyToken,
	async (req: IRequest, res): Promise<Response> => {
		try {
			console.log('/post board');
			const user = await User.findById(req.user.user_id);

			if (user) {
				let isUniue = true;
				const promises = [];
				if (user.boards) {
					for (let i = 0; i <= user.boards?.length; i += 1) {
						promises.push(Board.findById(user.boards[i], 'name'));
					}
					const boards = await Promise.all(promises);
					boards.forEach((item) => {
						if (item) {
							if (item.name === req.body.boardName) {
								isUniue = false;
							}
						}
					});
				}
				if (isUniue) {
					const board = await Board.create<IBoard>({
						name: req.body.boardName,
						headers: req.body.headers,
						members: [user.userName],
					});
					// eslint-disable-next-line
					user.boards?.push(board._id);

					await user.save();
					console.log(board);
					return res.status(200).json(board);
				}
				return res.status(401).send('board with this name already exist');
			}
			return res.status(402).send('no user with token');
		} catch (err) {
			console.log(err);
			return res.status(404).send('server error');
		}
	}
);

router.get('/users', async (req, res) => {
	const users = await User.find();

	res.send(users);
});

router.delete('/users', async (req, res) => {
	const response = await User.deleteMany({});
	res.send(response);
});

export default router;
