import blackOrWhite from "../scripts/blackOrWhite";

type Props = {
	body: any;
	width?: number;
};

export default function ElemBox({ body, width = 100 }: Props) {
	return (
		<div id="elem" className="font-bold rounded-md bg-white flex items-center justify-center font-mono" style={{
			height: width + "px", 
			width: width + "px", 
			fontSize: (width * 0.34)/(body.name.length * 0.3) + "px",
			backgroundColor: `#${body.color}`,
			color: blackOrWhite(body.color)
		}}>
			{body.name}
		</div>
	);
}