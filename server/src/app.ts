import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import { json } from 'body-parser';

import 'dotenv/config';

import { WebSocket } from 'ws';
import { Board, Task } from './models/Board';
import routes from './routes/routes';
import authRoutes from './routes/auth';
import boardsRoutes from './routes/boards';
import { verifyToken } from './middleware/auth';

const { app } = expressWs(express());
app.use(json());
app.use(cors());

const connections: { [name: string]: WebSocket[] } = {};
app.ws('/board/:boardId', (ws, req) => {
	console.log(req.params.boardId);
	if (connections[req.params.boardId]) {
		connections[req.params.boardId].push(ws);
	} else {
		connections[req.params.boardId] = [];

		connections[req.params.boardId].push(ws);
	}
});
app.use('/auth/', authRoutes);
app.use(verifyToken);

app.use('/', routes);
app.use('/boards/', boardsRoutes);
app.post('/board/:boardId', async (req, res) => {
	try {
		if (req.body.action === 'add') {
			const board = await Board.findById(req.params.boardId);
			if (board) {
				const task = new Task(req.body.payload);
				board.tasks.push(task);
				await board.save();
				connections[req.params.boardId].forEach((connection) => {
					connection.send(JSON.stringify(board.tasks));
				});
				return res.status(200).send(board);
			}
		}
		if (req.body.action === 'set') {
			const board = await Board.findById(req.params.boardId);
			if (board) {
				board.tasks = req.body.payload;
				await board.save();
				connections[req.params.boardId].forEach((connection) => {
					connection.send(JSON.stringify(board.tasks));
				});
				return res.status(200).send(board);
			}
		}
	} catch (err) {
		console.error(err);
		res.status(404).send(err);
	}
});

export default app;
