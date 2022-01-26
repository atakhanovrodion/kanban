import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { json } from 'body-parser';
import session from 'express-session';
import expressWs from 'express-ws';
import * as http from 'http';

import { Board, ITask, Task } from './models/Board';
import routes from './routes';

interface IRequest extends Express.Request {
	params: {
		boardId: string;
	};
}

const port = 3000;

mongoose
	.connect('mongodb://localhost:27017/kanban')
	.then(() => {
		const { app, getWss, applyTo } = expressWs(express());
		app.use(json());
		app.use(cors());
		app.use(
			session({
				resave: false,
				saveUninitialized: false,
				secret: 'kekw',
			})
		);
		expressWs(app);
		const connections = {};
		app.ws('/board/:boardId', (ws, req) => {
			if (connections[req.params.boardId]) {
				connections[req.params.boardId].push(ws);
			} else {
				connections[req.params.boardId] = [];

				connections[req.params.boardId].push(ws);
			}
		});
		app.use('/', routes);
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
		app.listen(port, () => {
			console.log(`app is listening on ${port}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
