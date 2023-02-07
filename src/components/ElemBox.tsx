import type { element } from "@prisma/client";

import blackOrWhite from "@/lib/blackOrWhite";

/**
 * `Props` is an object with a `body` property that is a React element and an optional `width` property
 * that is a number.
 * @property {element} body - The data of the modal.
 * @property {number} width - The width of the modal.
 */
type Props = {
	body: element;
	width?: number;
};

/**
 * `ElementBox takes a body object and a width, and returns a div with the body's name and color, and a font
 * size that scales with the width
 * @param {Props} props - The props that are passed to the component.
 * @returns A div with the name of the element, the color of the element, and the size of the element.
 */
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