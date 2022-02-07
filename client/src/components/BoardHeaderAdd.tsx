import { useState, BaseSyntheticEvent, useEffect } from 'react';

import { useSelector } from 'react-redux';

import '../styles/board_header_add.css';
import { getUsers, selectUsersList } from '../reducers/appReducer';
import { addUser } from '../reducers/board';

import store from '../store';
const BoardHeaderAdd = () => {
	const [text, setText] = useState('');
	const users = useSelector(selectUsersList);
	const onChange = (event: BaseSyntheticEvent) => {
		setText(() => event.target.value);
	};
	useEffect(() => {
		store.dispatch(getUsers());
	}, []);

	useEffect(() => {
		if (users.length > 0) {
			users.map((item) => console.log(item._id));
		}
	}, [users]);

	const filtered = users.filter((item) => {
		return item.userName.includes(text);
	});

	const usersElement = filtered.map((item) => (
		<li key={item._id}>
			<button
				onClick={() => {
					store.dispatch(addUser(item._id));
				}}
			>
				{item.userName}
			</button>
		</li>
	));

	return (
		<div className="boardHeaderAdd">
			<input type="text" onChange={onChange} value={text} />
			<ul>{usersElement}</ul>
		</div>
	);
};

export default BoardHeaderAdd;
