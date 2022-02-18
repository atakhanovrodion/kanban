import { BaseSyntheticEvent, useState } from 'react';
import { addBoard } from '../reducers/board';

import store from '../store';

import '../styles/create_new_board.css';

const CreateNewBoard = (): JSX.Element => {
	const [boardName, setBoardName] = useState('');
	const [headers, setHeaders] = useState([
		'ToDo',
		'Do Today',
		'In Progress',
		'Done',
	]);
	const onSubmit = async (e: BaseSyntheticEvent) => {
		try {
			e.preventDefault();
			if (boardName !== '' && !headers.includes('')) {
				for (let i = 0; i < headers.length - 1; i += 1) {
					for (let j = i + 1; j < headers.length; j += 1) {
						if (headers[i] === headers[j]) {
							return;
						}
					}
				}
				store.dispatch(addBoard(boardName, headers));
			}
		} catch (err) {
			console.log(err);
		}
	};

	const collumnsElement = headers.map((el) => (
		<li key={headers.findIndex((item) => item === el)}>
			<input
				onChange={(e: BaseSyntheticEvent) => {
					const ind = headers.findIndex((item) => item === el);
					setHeaders((prevState) => [
						...prevState.slice(0, ind),
						e.target.value,
						...prevState.slice(ind + 1),
					]);
				}}
				type="text"
				value={el}
			/>
			<button
				type="button"
				onClick={() => {
					const ind = headers.findIndex((item) => item === el);
					if (headers.length >= 3) {
						setHeaders((prevState) => [
							...prevState.slice(0, ind),
							...prevState.slice(ind + 1),
						]);
					}
				}}
			>
				remove
			</button>
		</li>
	));
	return (
		<div className="create_new_board">
			<form onSubmit={onSubmit}>
				<span>Create new board</span>
				<label htmlFor="create_name">
					Board Name
					<input
						type="text"
						id="create_name"
						value={boardName}
						onChange={(e: BaseSyntheticEvent) => {
							setBoardName(e.target.value);
						}}
					/>
				</label>
				<span>Collumns</span>
				<ul>
					{collumnsElement}
					<button
						type="button"
						onClick={() => {
							if (!headers.includes('')) {
								setHeaders((prevState) => {
									const newArr = [...prevState];
									newArr.push('');
									return newArr;
								});
							}
						}}
					>
						addCollumn
					</button>
				</ul>
				<button type="submit">create board</button>
			</form>
		</div>
	);
};

export default CreateNewBoard;
