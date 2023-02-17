import blackOrWhite from "@/lib/blackOrWhite";

/**
 * Props is an object with a name property that is a string, a color property that is a string, and an
 * optional width property that is a number.
 * @property {string} name - The name of the icon.
 * @property {string} color - string;
 * @property {number} width - number;
 */
type Props = {
	name: string;
	color: string;
	width?: number;
};

/**
 * `ElementBox takes a body object and a width, and returns a div with the body's name and color, and a font
 * size that scales with the width
 * @param {Props} props - The props that are passed to the component.
 * @returns A div with the name of the element, the color of the element, and the size of the element.
 */
export default function ElemBox({ name, color, width = 96 }: Props) {
	return (
		<div className="font-bold rounded-md bg-white flex items-center justify-center font-mono" style={{
			height: width + "px", 
			width: width + "px", 
			fontSize: (width * 0.34)/(name.length * 0.3) + "px",
			backgroundColor: `#${color}`,
			color: blackOrWhite(color)
		}}>
			{name}
		</div>
	);
}