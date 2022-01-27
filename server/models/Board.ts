import { Schema, model, Types, Document } from 'mongoose';

interface IBoard extends Document {
	boardName: string;
	headers: Types.Array<string>;
	members: Types.Array<string>;
	tasks: Types.DocumentArray<ITask>;
}
interface ITask extends Document {
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
	members: [String],
	tasks: { type: [taskSchecma] },
});

const Board = model('Board', schecma);
const Task = model('Task', taskSchecma);
export { IBoard, ITask, Board, Task };
