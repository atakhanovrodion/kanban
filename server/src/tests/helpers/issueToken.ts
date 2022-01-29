import { sign } from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;
interface IData {
	userName: string;
	_Id: string;
}

export default (data: IData, options = {}) =>
	sign(data, 'jwtsecretkey', options);
