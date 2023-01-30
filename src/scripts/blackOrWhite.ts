export default function blackOrWhite(hex: string) {
	// Convert hex to RGB
	let r = parseInt(hex.substring(0, 2), 16);
	let g = parseInt(hex.substring(2, 4), 16);
	let b = parseInt(hex.substring(4, 6), 16);

	// Calculate luminescence
	let L = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	// Compare to the equation and return the appropriate color
	if ((L + 0.05) / (0.0 + 0.05) > (1.0 + 0.05) / (L + 0.05)) {
		return "#000000";
	} else {
		return "#ffffff";
	}
}