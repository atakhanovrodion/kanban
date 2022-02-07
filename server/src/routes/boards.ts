import { Router, Response } from 'express';

import { User } from '../models/User';
import { IRequest } from '../middleware/auth';
import { Board } from '../models/Board';

const router = Router();

router.get('/', async (req: IRequest, res: Response) => {
	const user = await User.findById(req.user._id);
	const boards = user?.boards;
	res.status(200).send(boards);
});
router.get(
	'/:boardId',
	async (req: IRequest, res: Response): Promise<Response> => {
		const board = await Board.findOne({ _id: req.params.boardId });
		return res.status(200).send(board);
	}
);

router.post('/add', async (req: IRequest, res): Promise<Response | any> => {
	try {
		const user = await User.findById(req.user._Id);
		if (user) {
			let isUniue = true;
			const promises = [];
			if (user.boards) {
				for (let i = 0; i <= user.boards?.length; i += 1) {
					promises.push(Board.findById(user.boards[i], 'boardName'));
				}
				const boards = await Promise.all(promises);
				boards.forEach((item) => {
					if (item) {
						if (item.boardName === req.body.boardName) {
							isUniue = false;
						}
					}
				});
			}
			if (isUniue) {
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
			return res.status(403).send('board with this name already exist');
		}
		return res.status(404);
	} catch (err) {
		console.log(err);
		return res.status(500).send('server error');
	}
});
router.post(
	'/:boardId/add',
	async (req: IRequest, res): Promise<Response | any> => {
		try {
			const board = await Board.findById(req.params.boardId);
			const user = await User.findById(req.body.userId);
			if (user && board) {
				board.members.push(req.body.userId);
				user.boards?.push(req.params.boardId);
				board.save();
				user.save();
				return res.status(200).send('ok');
			}
			return res.status(404);
		} catch (err) {
			console.log(err);
			return res.status(500).send('server error');
		}
	}
);

export default router;
