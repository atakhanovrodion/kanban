import { Router, Response } from 'express';

import { User } from '../models/User';
import { IRequest } from '../middleware/auth';
import { Board } from '../models/Board';

const router = Router();

router.get('/', async (req: IRequest, res: Response) => {
	const user = await User.findById(req.user._Id);
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

export default router;
