import { Schema, model } from 'mongoose';

interface IUser {
	userName: string;
	hash: string;
	boards?: any[];
	token?: string;
	refreshToken?: string;
	notifications?: any[];
}

const schecma = new Schema<IUser>({
	userName: { type: String, required: true },
	hash: { type: String, required: true },
	boards: { type: Array, default: [] },
	token: String,
	refreshToken: String,
	notifications: { type: Array, default: [] },
});

const User = model('User', schecma);

export { User, IUser };
