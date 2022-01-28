import { verify, decode } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const { JWT_SECRET_KEY } = process.env;

interface IRequest extends Request {
	user?: any;
	boardName?: string;
}

const verifyToken = (
	req: IRequest,
	res: Response,
	next: NextFunction
): Response | void => {
	const token = req.headers.authorization;
	if (!token) return res.status(403).send('need token for authentication');
	try {
		const decoded = verify(token, JWT_SECRET_KEY);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send('bad token');
	}

	return next();
};
export { verifyToken, IRequest };
