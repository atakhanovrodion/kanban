type PlusIconProps = {
	handler: () => void;
};

const PlusIcon = ({ handler }: PlusIconProps): JSX.Element => (
	<svg
		className="member_icon"
		viewBox="0 0 100 100"
		width="25px"
		height="25px"
		fill="#fff"
		onClick={() => {
			handler();
		}}
	>
		<circle cx="50" cy="50" r="50" />
		<rect
			className="member_icon_add"
			id="svg_1"
			height="14"
			width="70"
			y="43"
			x="15"
			fill="#808080"
		/>
		<rect
			className="member_icon_add"
			id="svg_2"
			height="70"
			width="14"
			y="15"
			x="43"
			fill="#808080"
		/>
	</svg>
);

export default PlusIcon;
