import { Router, Response } from 'express';

import { v4 as uuid } from 'uuid';
import { User } from '../models/User';
import { IRequest } from '../middleware/auth';
import { Board } from '../models/Board';

const router = Router();

router.get('/', async (req: IRequest, res: Response) => {
	const user = await User.findById(req.user._Id);

	const promises: any = [];

	if (user && user.boards && user.boards.length > 0) {
		user.boards.forEach((boardId) =>
			promises.push(Board.findById(boardId, 'boardName'))
		);
	}

	const result = await Promise.all(promises);

	res.status(200).send(result);
});
router.get(
	'/:boardId',
	async (req: IRequest, res: Response): Promise<Response> => {
		const board = await Board.findOne({ _id: req.params.boardId });
		if (board) {
			return res.status(200).send(board);
		}
		return res.status(404).send('bad boardid');
	}
);

router.post('/add', async (req: IRequest, res): Promise<Response | any> => {
	try {
		const user = await User.findById(req.user._Id);
		if (user) {
			if ((req.body.boardName, req.body.headers)) {
				const board = await Board.create({
					boardName: req.body.boardName,
					headers: req.body.headers,
					members: [user._id],
					tasks: [],
				});
				user.boards?.push(board._id);
				await user.save();
				return res.status(200).json(board);
			}
			return res.status(404).send('bad request');
		}
		return res.status(404);
	} catch (err) {
		return res.status(500).send('server error');
	}
});
router.post(
	'/:boardId/invite',
	async (req: IRequest, res): Promise<Response | any> => {
		try {
			const board = await Board.findById(req.params.boardId);
			const user = await User.findById(req.body.userId);
			if (user && board) {
				//		board.members.push(req.body.userId);
				user.notifications?.push({
					id: uuid(),
					type: 'invite',
					boardId: req.params.boardId,
					from: req.user.userName,
				});
				user.save();
				return res.status(200).send('ok');
			}
			return res.status(404);
		} catch (err) {
			return res.status(500).send('server error');
		}
	}
);
router.post(
	'/:boardId/update',
	async (req: IRequest, res): Promise<Response | any> => {
		try {
			await Board.findByIdAndUpdate(req.params.boardId, req.body);

			return res.status(200).send('ok');
		} catch (err) {
			return res.status(500).send('server error');
		}
	}
);
router.post(
	'/:boardId/remove',
	async (req: IRequest, res): Promise<Response | any> => {
		try {
			const board = await Board.findById(req.params.boardId);

			if (!board) {
				return res.status(404);
			}
			// Promise all refactoring
			//
			for (let i = 0; i < board.members.length; i += 1) {
				const user = await User.findById(board.members[i]);
				if (user && user.boards) {
					const ind = user.boards.findIndex(
						(item) => item.toString() === req.params.boardId
					);
					const newArr = [
						...user.boards.slice(0, ind),
						...user.boards.slice(ind + 1, user.boards.length),
					];
					user.boards = newArr;
					await user.save();
				}
			}

			await Board.findByIdAndRemove(req.params.boardId);
			return res.status(200).send('ok');
		} catch (err) {
			return res.status(500).send('server error');
		}
	}
);

export default router;
