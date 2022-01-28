import { sign } from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;

export default (data: any, options = {}) => sign(data, JWT_SECRET_KEY, options);
