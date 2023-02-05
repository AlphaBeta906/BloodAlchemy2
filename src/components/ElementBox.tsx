import type { element } from "@prisma/client";

import blackOrWhite from "@/lib/blackOrWhite";

type Props = {
	body: element;
	width?: number;
};

export default function ElemBox({ body, width = 96 }: Props) {
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