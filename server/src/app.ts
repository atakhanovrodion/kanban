import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import { json } from 'body-parser';

import 'dotenv/config';

import { WebSocket } from 'ws';
import { Board, Task } from './models/Board';
import routes from './routes';
import authRoutes from './routes/auth';

const { app } = expressWs(express());
app.use(json());
app.use(cors());

const connections: { [name: string]: WebSocket[] } = {};
app.ws('/board/:boardId', (ws, req) => {
	if (connections[req.params.boardId]) {
		connections[req.params.boardId].push(ws);
	} else {
		connections[req.params.boardId] = [];

		connections[req.params.boardId].push(ws);
	}
});
app.use('/', routes);
app.use('/auth/', authRoutes);
app.post('/board/:boardId', async (req, res) => {
	try {
		console.log(req.body);
		if (req.body.type === 'add') {
			const board = await Board.findById(req.params.boardId);
			if (board) {
				const task = await new Task(req.body.content);
				board.tasks.push(task);
				await board.save();
				connections[req.params.boardId].forEach((connection) => {
					connection.send(board._id);
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
