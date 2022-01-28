import mongoose from 'mongoose';

const { MONGO_URL } = process.env;
export default async () => {
	try {
		console.log('successfuly connected to database');
		return await mongoose.connect(MONGO_URL);
	} catch (err: any) {
		console.log('database connection failed. exiting now...');
		console.error(err);
	}
};
