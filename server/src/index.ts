import app from './app';
import db from './db';

const { SERVER_PORT } = process.env;
db().then(() => {
	app.listen(SERVER_PORT, async () => {
		console.log(`app listening on port ${SERVER_PORT}`);
	});
});
