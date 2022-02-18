import { BaseSyntheticEvent, useState } from 'react';
import '../styles/member_icon.css';
import Wrapper from './Wrapper';
import IconWindow from './IconWindow';
import UserSettings from './UserSettings';

type MemberIconProps = {
	name: string;
	type: string;
	filterOnUser?: (user: string) => void;
	active?: boolean;
	filter?: string[];
	onHeader?: boolean;
};

const MemberIcon = ({
	name,
	type,
	filterOnUser,
	active = true,
	filter = [''],
	onHeader = true,
}: MemberIconProps): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);
	const [offset, setOffset] = useState([30, 30]);
	const stateHandler = () => {
		setIsOpen((prevState) => !prevState);
	};
	const onClick = (e: BaseSyntheticEvent) => {
		if (!active) {
			return;
		}
		setOffset([
			e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
			e.currentTarget.offsetLeft,
		]);
		stateHandler();
	};

	const val = name.slice(0, 2).toUpperCase();
	const userSettingElement = isOpen && (
		<Wrapper stateHandler={stateHandler} className="wrapper">
			<UserSettings offsetX={offset[1]} offsetY={offset[0]} />
		</Wrapper>
	);

	const iconWindowElement = isOpen && type !== 'user_settings' && (
		<Wrapper stateHandler={stateHandler} className="wrapper">
			<IconWindow
				offsetX={offset[1]}
				offsetY={offset[0]}
				name={name}
				filterOnUser={filterOnUser}
				filter={filter}
				onHeader={onHeader}
			/>
		</Wrapper>
	);
	if (name === '') {
		return <> </>;
	}
	return (
		<>
			<div className="member_icon_button" onClick={onClick}>
				<svg className="member_icon" viewBox="0 0 200 200" fill="#fff">
					<circle cx="100" cy="100" r="100" />
					<text className="member_icon_text" x="30" y="130">
						{val}
					</text>
				</svg>
			</div>

			{iconWindowElement}
			{userSettingElement}
		</>
	);
};

export default MemberIcon;
