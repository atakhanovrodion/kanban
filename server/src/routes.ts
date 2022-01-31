import express, { Response } from 'express';

import { Board } from './models/Board';
import { User } from './models/User';
import { verifyToken, IRequest } from './middleware/auth';

const router = express.Router();

router.get('/users', verifyToken, async (req, res) => {
	const users = await User.find();

	res.send(users);
});

router.delete('/users', async (req, res) => {
	const response = await User.deleteMany({});
	res.send(response);
});

export default router;
