import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface IRequest extends Request {
	user?: any;
}

const verifyToken = (
	req: IRequest,
	res: Response,
	next: NextFunction
): Response | void => {
	const token = req.headers.authorization || req.body.token;
	console.log(token);
	if (!token) return res.status(404).send('need token for authentication');
	try {
		const decoded = verify(token, 'secret');
		req.user = decoded;
	} catch (err) {
		return res.status(401).send('bad token');
	}

	return next();
};
export { verifyToken, IRequest };
