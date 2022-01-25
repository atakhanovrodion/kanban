import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import mongoose from 'mongoose';
import cors from 'cors';
import { json } from 'body-parser';
import session from 'express-session';
import path from 'path';
// import { IUser, addUser, authenticate, IBoard, IBoards, addBoard } from './db';
import routes from './routes';

const port = 3000;

/*
app.get('/auth', async (req, res) => {
  console.log('GET /AUTH ');
  const data = await readFile(path.join(__dirname, '..', 'users.json'));

  res.send(JSON.parse(data.toString())[0].email);
});

app.post('/login', async (req, res) => {
  console.log('POST /LOGIN ');

  res.send((await authenticate(req.body.login, req.body.password)).toString());
});

app.get('/board/:id', async (req, res) => {
  console.log('GET /BOARDS:id  ');
  const rawData = await readFile(path.join(__dirname, '..', 'boards.json'));
  const Boards: IBoards = JSON.parse(rawData.toString());
  res.send(Boards[req.params.id]);
});

app.post('/board', async (req, res) => {
  console.log('POST /board');
  console.log(req.body);
  res.send(await addBoard(req.body.name, req.body.headers, req.body.members));
});

app.get('/boards/:user', async (req, res) => {
  console.log('GET /BOARDS:user  ');
  const rawData = await readFile(path.join(__dirname, '..', 'boards.json'));
  const Boards: IBoards = JSON.parse(rawData.toString());
  const result: IBoard[] = [];
  Object.values(Boards).forEach((item) => {
    if (item.members.includes(req.params.user)) {
      result.push(item);
    }
  });

  res.send(result);
});

app.post('/boards/:id', async (req, res) => {
  console.log('POST BOARDS/ID ');
  const rawData = await readFile(path.join(__dirname, '..', 'boards.json'));
  const Boards: IBoards = JSON.parse(rawData.toString());
  Boards[req.params.id] = req.body;
  writeFile(path.join(__dirname, '..', 'boards.json'), JSON.stringify(Boards));
});

app.post('/registration', async (req, res) => {
  console.log('POST registration');
  if ((await authenticate(req.body.login, req.body.password))[0] === 0) {
    addUser(req.body.login, req.body.password);
    res.send('ok');
  } else {
    res.send('err');
  }
});
app.post('/board', async (req, res) => {
  console.log('POST board');
  console.log(req.body);
  res.send('okk');
});
*/

mongoose.connect('mongodb://localhost:27017/kanban').then(() => {
  const app = express();
  app.use(json());
  app.use(cors());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: 'kekw',
    })
  );
  app.use('/', routes);
  app.listen(port, () => {
    console.log(`app is listening on ${port}`);
  });
});
