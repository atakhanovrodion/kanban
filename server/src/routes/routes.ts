import express from 'express';

import { User } from '../models/User';
import { Board } from '../models/Board';
import { IRequest } from '../middleware/auth';

const router = express.Router();

router.get('/users', async (req, res) => {
	const users = await User.find({});
	const data = users.map((user) => ({
		_id: user._id,
		userName: user.userName,
	}));
	res.send(data);
});

router.get('/user', async (req: IRequest, res) => {
	const user = await User.findById(req.user._Id);
	res.send({
		userName: user?.userName,
		boards: user?.boards,
		notifications: user?.notifications,
	});
});

router.post('/accept', async (req: IRequest, res) => {
	try {
		const user = await User.findById(req.user._Id);
		if (user) {
			const notification = user.notifications?.find(
				(item) => item.id === req.body.notificationId
			);
			const board = await Board.findById(notification.boardId);
			if (user && board && user.notifications) {
				user.boards?.push(notification.boardId);
				board.members.push(req.user._Id);
				const ind = user.notifications.findIndex(
					(item) => item.id === req.body.notificationId
				);
				const newArr = [
					...user.notifications.slice(0, ind),
					...user.notifications.slice(ind + 1, user.notifications.length),
				];
				user.notifications = newArr;
				await user.save();
				await board.save();
				res.status(200).send('ok');
			}
		}

		res.status(404);
	} catch (err) {
		console.error(err);
		res.status(500);
	}
});
router.post('/decline', async (req: IRequest, res) => {
	try {
		const user = await User.findById(req.user._Id);
		if (user) {
			if (user.notifications) {
				const ind = user.notifications.findIndex(
					(item) => item.id === req.body.notificationId
				);
				const newArr = [
					...user.notifications.slice(0, ind),
					...user.notifications.slice(ind + 1, user.notifications.length),
				];
				user.notifications = newArr;
				await user.save();
				res.status(200).send('ok');
			}
		}

		res.status(404);
	} catch (err) {
		console.error(err);
		res.status(500);
	}
});

router.delete('/users', async (req, res) => {
	const response = await User.deleteMany({});
	res.send(response);
});

export default router;
