import { Schema, model } from 'mongoose';

interface IBoard {
	name: string;
	headers: string[];
	members: string[];
	tasks?: { type: ITask[]; default: [] };
}
interface ITask {
	text: string;
	header: string;
	color: string;
	members: string[];
	labels?: string[];
	description?: string;
}
const taskSchecma = new Schema<ITask>({
	text: String,
	header: String,
	color: String,
	members: [String],
	labels: [String],
	description: String,
});

const schecma = new Schema<IBoard>({
	name: String,
	headers: [String],
	members: [String],
	tasks: [taskSchecma],
});

const Board = model('Board', schecma);
const Task = model('Task', taskSchecma);
export { IBoard, ITask, Board, Task };
