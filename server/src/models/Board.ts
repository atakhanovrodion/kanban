import { Schema, model, Types } from 'mongoose';

interface IBoard {
	boardName: string;
	headers: string[];
	members: Types.ObjectId[];
	tasks: ITask[];
}
interface ITask {
	text: string;
	header: string;
	color: string;
	members: Types.Array<string>;
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
	boardName: { type: String, required: true },
	headers: [String],
	members: [Types.ObjectId],
	tasks: { type: [taskSchecma] },
});

const Board = model('Board', schecma);
const Task = model('Task', taskSchecma);
export { IBoard, ITask, Board, Task };
