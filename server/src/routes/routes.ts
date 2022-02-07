import express from 'express';

import { User } from '../models/User';
import { IRequest } from '../middleware/auth';

const router = express.Router();

router.get('/users', async (req, res) => {
	const users = await User.find();

	res.send(users);
});

router.get('/user', async (req: IRequest, res) => {
	const user = await User.findById(req.user._Id);
	res.send({ userName: user?.userName, boards: user?.boards });
});

router.delete('/users', async (req, res) => {
	const response = await User.deleteMany({});
	res.send(response);
});

export default router;