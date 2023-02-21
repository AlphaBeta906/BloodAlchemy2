/**
 * It takes a hex color code, converts it to RGB, calculates the luminance, and returns either black or
 * white depending on which color contrasts better. Code was written by SudoPlz. (https://stackoverflow.com/users/1658268/sudoplz)
 * @param {string} hex - The hexadecimal color code to be converted.
 * @see {@link https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color} for reference.
 * @returns A string of either "#000000" or "#ffffff"
 */
export default function blackOrWhite(hex: string) {
	const color = (hex.charAt(0) === "#") ? hex.substring(1, 7) : hex;
	const r = parseInt(color.substring(0, 2), 16); // hexToR
	const g = parseInt(color.substring(2, 4), 16); // hexToG
	const b = parseInt(color.substring(4, 6), 16); // hexToB

	const uicolors = [r / 255, g / 255, b / 255];
	const c = uicolors.map((col) => {
		if (col <= 0.03928) {
			return col / 12.92;
		}
		return Math.pow((col + 0.055) / 1.055, 2.4);
	});
	const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);

	return (L > 0.179) ? "000000" : "ffffff";
}