import { Schema, model } from 'mongoose';

interface IUser {
	userName: string;
	hash: string;
	boards?: any[];
	token?: string;
}

const schecma = new Schema<IUser>({
	userName: { type: String, required: true },
	hash: { type: String, required: true },
	boards: { type: Array, default: [] },
	token: { type: String },
});

const User = model('User', schecma);

export { User, IUser };
